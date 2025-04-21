import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Button, Box, Typography, Paper } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { signIn, state: { isAuthenticated } } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <Box
  sx={{
    width: '100vw', // full viewport width
    height: '85vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background.default',
  }}
>
  <Paper
    sx={{
      padding: '30px',
      textAlign: 'center',
      borderRadius: '10px',
      boxShadow: 3,
      width: '90%', // responsive width of the sign-in box
      maxWidth: '400px',
    }}
  >
    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
      Sign In to Access
    </Typography>
    <Button
      variant="contained"
      sx={{
        marginTop: '20px',
        backgroundColor: '#355070',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  </Paper>
</Box>
    );
  }

  return children;
};

export default ProtectedRoute;
