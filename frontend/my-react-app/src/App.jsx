import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";
import { config } from "../asgardeoConfig";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Home from "./pages/Home"; 
import ProductManagement from "./pages/ProductManagement";
import CustomerManagement from "./pages/CustomerManagement";
import Orders from "./pages/Orders";
import ShoppingCart from './pages/ShoppingCart'; // <-- Keep only one

import { CartProvider } from './context/CartContext';

const App = () => {
  const { state } = useAuthContext();
  return (
    <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={
            state.isAuthenticated ? <Navigate to="/orders" replace /> : <Home />} 
            />
            
            <Route path="/cart" element={<ShoppingCart />} />

            {/* logged in Management Routes */}
            <Route path="/orders" 
              element={
                <ProtectedRoute>
                  <Orders/>
                </ProtectedRoute>
              }
            />
            <Route path="/product-management" 
              element={
                <ProtectedRoute>
                  <ProductManagement />
                </ProtectedRoute>
              } 
            />
            <Route path="/customer-management" 
              element={
                <ProtectedRoute>
                  <CustomerManagement />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </CartProvider>
  );
};

export default App;
