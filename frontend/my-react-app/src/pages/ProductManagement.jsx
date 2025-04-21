import React, { useEffect, useState } from 'react';

const BudiApp = () => {
  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
     <h1 style={{ padding: '0px 0px 0px 20px'}}>Product Listings</h1>
      <iframe
        src="https://sphma.budibase.app/embed/product-management"
        width="100%"
        height="800"
        style={{ border: 'none' }}
        allow="clipboard-write; camera; geolocation; fullscreen"
        title="Budibase Embed"
      ></iframe>
    </div>
  );
};

export default BudiApp;