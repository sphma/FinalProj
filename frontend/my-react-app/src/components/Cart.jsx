import React from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Box } from '@mui/material';

const Cart = ({ cart, onCheckout, onRemove }) => {
  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + Number(item.Price) * item.quantity, 0);

  return (
    <Card className="cart-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body2">Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cart.map((item, idx) => (
                <ListItem
                  key={item.id + '-' + idx}
                  secondaryAction={
                    <Button color="error" size="small" onClick={() => onRemove(item.id)}>
                      Remove
                    </Button>
                  }
                >
                  <ListItemText
                    primary={`${item.quantity}x ${item.Name}`}
                    secondary={`@ Price: $${item.Price} each | Subtotal: $${(item.Price * item.quantity).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>

            <Box mt={2} mb={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total: ${total.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={cart.length === 0}
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Cart;