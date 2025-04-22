// server.js (CommonJS)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const supabase = createClient(
  'https://facwuxporhnlptwaiftk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY3d1eHBvcmhubHB0d2FpZnRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MTkxMDksImV4cCI6MjA2MDA5NTEwOX0.togZFTkihQTCbGYTT0OWWM_4QJGKOmYkn9a8I3HziT8'
);

app.use(cors({
  origin: 'http://localhost:5173' // or use '*' for all origins during dev
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

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
