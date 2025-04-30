import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import Section from '../components/Section';
import CartAdded from '../components/CartAdded';
import ChatWindow from '../components/ChatWindow';
import { useCart } from '../context/CartContext';
import "../style.css";

const PORT = 3000;
const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add to Cart function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
  
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setSnackbarOpen(true);
  };
  

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
    <Section title="Featured Products" subtitle="Check out our latest products!">
      <Grid container spacing={4} justifyContent="flex-start">
        {products.length > 0 ? (
          [...products]
            .sort((a, b) => a.id - b.id)
            .map((product) => (
              <Grid item key={product.id}>
                <Card sx={{ height: '100%', width: 338, display: 'flex', flexDirection: 'column' }}>
                  {product.ImageURL && (
                    <CardMedia
                      component="img"
                      sx={{
                        height: 325,
                        objectFit: "cover",
                        mx: "auto",
                        p: 0,
                        m: 0
                      }}
                      image={product.ImageURL}
                      alt={product.Name} />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.Description}
                    </Typography>
                    <Typography variant="h6">${product.Price}</Typography>
                    {!isAuthenticated && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Grid item>
            <Typography variant="h6" align="center">
              Products are loading...
            </Typography>
          </Grid>
        )}
      </Grid>

      <CartAdded
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message="Product added to cart!" />
    </Section>
    <ChatWindow />
    </>
  );
};

export default Home;