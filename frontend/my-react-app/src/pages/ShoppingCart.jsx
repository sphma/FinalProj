import React, { useState } from 'react';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';

import { useCart } from '../context/CartContext';


const ShoppingCart = () => {
    const { cart, setCart } = useCart();
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const handleRemove = (id) => setCart(cart.filter(item => item.id !== id));
    const handleCheckout = () => setCheckoutOpen(true);
    const handleClose = () => setCheckoutOpen(false);

    return (
        <div>
        <Cart cart={cart} onCheckout={handleCheckout} onRemove={handleRemove} />
        <Checkout
            open={checkoutOpen}
            handleClose={handleClose}
            selectedProduct={cart.length === 1 ? cart[0] : null} // For single product checkout, or adapt for multiple
        />
        </div>
    );
};

export default ShoppingCart;