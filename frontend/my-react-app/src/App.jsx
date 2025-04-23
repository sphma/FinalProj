import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "@asgardeo/auth-react";  // Keep this if you want authentication
import { config } from "../asgardeoConfig";
import Home from "./pages/Home"; 
import ProductManagement from "./pages/ProductManagement";
import CustomerManagement from "./pages/CustomerManagement";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // Component to protect routes

const App = () => {
  return (
    <AuthProvider config={config}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
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
        </Router>
    </AuthProvider>
  );
};

export default App;
