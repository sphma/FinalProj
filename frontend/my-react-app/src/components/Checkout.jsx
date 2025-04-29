import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // <-- Add this

const CheckoutDialog = ({ open, handleClose }) => {
  const { cart, setCart } = useCart(); // <-- Add this
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!cart || cart.length === 0) return; // <-- Check cart, not selectedProduct
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        items: cart.map(item => ({
          product_id: item.id,
          name: item.Name,
          quantity: item.quantity || 1,
          price: item.Price
        })),
        order_amt: cart.reduce((sum, item) => sum + Number(item.Price || 0), 0), // <-- Total for all products
        order_date: new Date().toISOString(),
        status: "not shipped"
      });
      setCheckoutSuccess(true);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleSuccessClose = () => {
    setCheckoutSuccess(false);
    handleClose();
    setForm({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setCart([]); // Clear the cart after successful checkout
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {checkoutSuccess ? (
          <>
            <DialogTitle>Checkout Confirmed</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                Thank you for your order!
              </Typography>
              <Typography>
                Your order has been placed successfully. <br />
                A confirmation email will be sent to {form.email}!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSuccessClose} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Checkout as Guest</DialogTitle>
            <DialogContent>
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  fullWidth
                  required
                />
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Shipping Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  minRows={2}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CheckoutDialog;