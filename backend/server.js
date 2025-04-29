// server.js (CommonJS)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = 3000;

const supabase = createClient(
  // process.env.SUPABASE_URL,
  // process.env.SUPABASE_KEY
  'https://facwuxporhnlptwaiftk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY3d1eHBvcmhubHB0d2FpZnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MTkxMDksImV4cCI6MjA2MDA5NTEwOX0.togZFTkihQTCbGYTT0OWWM_4QJGKOmYkn9a8I3HziT8'
);

app.use(cors({
  origin: [
    'http://localhost:5173'                   // for local development
    // 'https://opashshop.azurewebsites.net',      // optionally, allow same-origin if needed
    // 'https://final-proj-5san.vercel.app'
  ]
}));
app.use(express.json());

app.get('/products', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/products', async (req, res) => {
  const { Name, Description, Price } = req.body;
  const { data, error } = await supabase.from('products').insert([{ Name, Description, Price }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.get('/customers', async (req, res) => {
  const { data, error } = await supabase.from('customers').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/customers', async (req, res) => {
  const { Name, Email, Phone, Address } = req.body;
  const { data, error } = await supabase.from('customers').insert([{ Name, Email, Phone, Address }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.get('/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

//gets products on an order
app.get('/orders/:id/products', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('productorder')
    .select('product_id, quantity, price, products(Name)')
    .eq('order_id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

//updates order status
app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // e.g., { status: "shipped" }
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});


app.post('/orders', async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    items, // array of { product_id, quantity, price }
    order_amt,
    order_date,
    status
  } = req.body;

  // 1. Insert or find customer
  let customer_id;
  const { data: existingCustomer, error: findError } = await supabase
    .from('customers')
    .select('id')
    .eq('Email', email)
    .single();

  if (findError && findError.code !== 'PGRST116') {
    return res.status(500).json({ error: findError.message });
  }

  if (existingCustomer) {
    customer_id = existingCustomer.id;
  } else {
    const { data: newCustomer, error: insertError } = await supabase
      .from('customers')
      .insert([{ Name: name, Email: email, Phone: phone, Address: address }])
      .select('id')
      .single();
    if (insertError) return res.status(500).json({ error: insertError.message });
    customer_id = newCustomer.id;
  }

  // 2. Insert order (no product_id here)
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      customer_id,
      order_date,
      order_amt,
      shipping_address: address,
      status
    }])
    .select('id')
    .single();

  if (orderError) return res.status(500).json({ error: orderError.message });

  const order_id = orderData.id;

  // 3. Insert each product into productorder table
  const productOrderRows = items.map(item => ({
    order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }));

  const { error: poError } = await supabase
    .from('productorder')
    .insert(productOrderRows);

  if (poError) return res.status(500).json({ error: poError.message });

  res.status(201).json({ order_id });
});

app.get('/shop', async (req, res) => {
  const { data, error } = await supabase.from('shop').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
