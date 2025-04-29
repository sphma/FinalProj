import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//notification that appears when an item is added to the cart
const CartAdded = ({ open, handleClose, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default CartAdded;