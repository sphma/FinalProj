import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Section from '../components/Section';
import "../style.css";

const PORT = 8080;
const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <Section title="Featured Products" subtitle="Check out our latest products!">
      <Grid container spacing={4} justifyContent="center">
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.Description}
                  </Typography>
                  <Typography variant="h6">${product.Price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No products found. Add one!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Section>
  );
};

export default Home;
