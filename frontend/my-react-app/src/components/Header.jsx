// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '@asgardeo/auth-react';
// import axios from 'axios';
// import "../style.css";

// const Header = () => {
//   const { signIn, signOut, state } = useAuthContext();
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!state.isAuthenticated || !state.Email) {
//         setUserRole(null);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/customers/${encodeURIComponent(state.Email)}`
//         );

//         if (response.data && response.data.role) {
//           setUserRole(response.data.role);
//         } else {
//           //create new user
//           await axios.post(`${import.meta.env.VITE_API_URL}/customers`, {
//             Email: state.Email
//           });

//           setUserRole("customer"); // set locally
//           console.log("New user added to DB");
//         }
//       } catch (error) {
//         console.error("Error checking or adding user", error);
//       }
//     };

//     fetchUser();
//   }, [state]);

//   console.log("Authenticated:", state.isAuthenticated);
// console.log("User Email:", state.Email);
// console.log("User Role:", userRole);

//   return (
//     <header style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       position: 'relative',
//     }}>
//       <div href="/" style={{ display: 'flex', flexDirection: 'column' }}>
//         <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
//           Opashi Studios Shop
//         </h1>
//         {state.isAuthenticated && (
//           <span className="welcome-text">Welcome, {state.Email}</span>
//         )}
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <nav style={{ display: 'flex' }}>
//           <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Home</a>

//           {/* Admin-only links */}
//           {!state.isAuthenticated ? null : (
//             <>
//           {userRole === "Admin" && (
//             <>
//               <a href="/product-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Product Management</a>
//               <a href="/customer-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Customer Management</a>
//             </>
//           )}
//           </>
//           )}
//         </nav>

//         <div style={{ marginLeft: '20px' }}>
//           {/* Show Sign In or Sign Out based on authentication */}
//           {state.isAuthenticated ? (
//             <span
//               onClick={() => signOut()}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 textDecoration: 'underline',
//               }}
//             >
//               Sign Out
//             </span>
//           ) : (
//             <span
//               onClick={() => signIn()}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 textDecoration: 'underline',
//               }}
//             >
//               Sign In
//             </span>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import { useAuthContext } from '@asgardeo/auth-react';
// import "../style.css";

// const Header = () => {
//   const { signIn, signOut, state } = useAuthContext();

//   // Extract roles from the Asgardeo ID token
//   const idTokenParsed = state.idTokenParsed || {};
//   // Try both possible claim names
//   const roles =
//   idTokenParsed["http://wso2.org/claims/applicationRoles"] ||
//   idTokenParsed["http://wso2.org/claims/application_roles"] ||
//     idTokenParsed["http://wso2.org/claims/roles"] ||
//     [];
//   const isAdmin = Array.isArray(roles)
//     ? roles.includes("Admin")
//     : roles === "Admin";

//     const displayName = idTokenParsed["http://wso2.org/claims/displayName"] || "";
//     const email =
//     idTokenParsed["email"] ||
//     idTokenParsed["http://wso2.org/claims/emailaddress"] ||
//     "";

//     console.log("Full state:", state);


//   return (
//     <header style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       position: 'relative',
//     }}>
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
//           Opashi Studios Shop
//         </h1>
//         {state.isAuthenticated && (
//           <span className="welcome-text">Welcome, {email}</span>
//         )}
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <nav style={{ display: 'flex' }}>
//           <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Home</a>
//           {state.isAuthenticated && isAdmin && (
//             <>
//               <a href="/product-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Product Management</a>
//               <a href="/customer-management" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', margin: '0 15px' }}>Customer Management</a>
//             </>
//           )}
//         </nav>

//         <div style={{ marginLeft: '20px' }}>
//           {state.isAuthenticated ? (
//             <span
//               onClick={() => signOut()}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 textDecoration: 'underline',
//               }}
//             >
//               Sign Out
//             </span>
//           ) : (
//             <span
//               onClick={() => signIn()}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 textDecoration: 'underline',
//               }}
//             >
//               Sign In
//             </span>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { useCart } from '../context/CartContext'; // <-- Import useCart
import "../style.css";

const Header = () => {
  const { signIn, signOut, state } = useAuthContext();
  const email = state.email || "";
  const { cart } = useCart(); // <-- Get cart from context

  // Calculate total quantity in cart
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header style={{
      width: '100vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      top: 0,
      margin: 0,
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
          Opashi Studios Shop
        </h1>
        {state.isAuthenticated && (
          <span className="welcome-text">Welcome, {email}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <nav style={{ display: 'flex' }}>
          {!state.isAuthenticated && (
            <>
              <a href="/" className="header-link">Products</a>
              <a href="/cart" className="header-link">
                Cart
                {cartCount > 0 && (
                    <span className="cart-badge">
                      {cartCount}
                    </span>
                )}
              </a>
            </>
          )}

          {state.isAuthenticated && (
            <>
              <a href="/" className="header-link">Listings</a>
              <a href="/orders" className="header-link">Orders</a>
              <a href="/product-management" className="header-link">Product Management</a>
              <a href="/customer-management" className="header-link">Customer Management</a>
            </>
          )}
        </nav>

        <div style={{ marginLeft: '20px' }}>
          {state.isAuthenticated ? (
            <span
              onClick={() => signOut()}
              className="header-link"
            >
              Sign Out
            </span>
          ) : (
            <span
              onClick={() => signIn()}
              className="header-link"
            >
              Sign In
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;