import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css' 
import App from './App.jsx'

// import context
import { AppProvider } from "./context/AppContext";

// import asgardeo
import { AuthProvider } from "@asgardeo/auth-react";
import { config } from "../asgardeoConfig";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <AppProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
        {/* <AuthSync /> */}
      </AppProvider>
    </AuthProvider>
    </React.StrictMode>
);
