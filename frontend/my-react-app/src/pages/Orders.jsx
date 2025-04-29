import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Chip, Button, Tabs, Tab, Box } from '@mui/material';
import Section from '../components/Section';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState({});
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    orders.forEach(order => {
      if (!orderProducts[order.id]) {
        fetchOrderProducts(order.id);
      }
    });
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrderProducts = async (orderId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${orderId}/products`);
      setOrderProducts(prev => ({ ...prev, [orderId]: response.data }));
    } catch (error) {
      console.error('Error fetching order products:', error);
    }
  };

  const getCustomerName = (id) => {
    const customer = customers.find((c) => String(c.id) === String(id));
    return customer ? customer.Name : `ID: ${id}`;
  };

  const getProductName = (id) => {
    const product = products.find((p) => String(p.id) === String(id));
    return product ? product.Name : `ID: ${id}`;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

    // Sort orders by order_date in ascending order
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.order_date) - new Date(b.order_date)
  );

  // Split orders by status
  const notShippedOrders = sortedOrders.filter(order => order.status !== "shipped");
  const shippedOrders = sortedOrders.filter(order => order.status === "shipped");

  return (
    <Section title="Orders">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`Not Shipped (${notShippedOrders.length})`} />
          <Tab label={`Shipped (${shippedOrders.length})`} />
        </Tabs>
      </Box>
      <Grid container spacing={4} justifyContent="flex-start">
        {(tab === 0 ? notShippedOrders : shippedOrders).length > 0 ? (
          (tab === 0 ? notShippedOrders : shippedOrders).map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Order #{order.id}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={order.status === "shipped" ? "success" : "warning"}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body1">
                    <strong>Customer Name:</strong> {getCustomerName(order.customer_id)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Products:</strong>
                      <ul>
                        {(orderProducts[order.id] || []).map((item, idx) => (
                          <li key={idx}>
                            {item.products?.Name || `Product ID: ${item.product_id}`}<br />
                            Qty: {item.quantity}   Price: ${item.price}
                          </li>
                        ))}
                      </ul>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Shipping Address:</strong> {order.shipping_address}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    <strong>Total Items:</strong>{" "}
                    {(orderProducts[order.id] || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)}
                  </Typography>
                  <Typography variant="h6">
                    <strong>Total Amount:</strong> ${order.order_amt}
                  </Typography>
                  {order.status !== "shipped" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => updateOrderStatus(order.id, "shipped")}
                    >
                      Mark as Shipped
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No orders found in this tab.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Section>
  );
};

export default Orders;