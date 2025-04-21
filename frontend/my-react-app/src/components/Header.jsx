import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Button } from '@mui/material';  // Import MUI Button
import "../style.css";
const Header = () => {
  const { signOut, state: { isAuthenticated } } = useAuthContext();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',  // Vertically align items in the header
      position: 'relative',  // Container for absolute positioning
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
          Opashi Studios Shop
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>  {/* Align nav links in center */}
        <nav style={{ display: 'flex' }}>
          {/* Directly use anchor tags for navigation */}
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Home</a>
          <a href="/product-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Product Management</a>
          <a href="/customer-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Customer Management</a>
        </nav>
        {isAuthenticated && (
          <div
            style={{
              marginLeft: '20px', // Adds space between nav links and the "Sign Out" button
            }}
          >
            <span
              onClick={() => signOut()}
              style={{
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Sign Out
            </span>
          </div>
        )}
      </div>
    </header>
  );
  
};

export default Header;

