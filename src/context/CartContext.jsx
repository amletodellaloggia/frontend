import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Custom hook for easy access
export function useCart() {
  return useContext(CartContext);
}

// Cart Provider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add product to cart
  function addToCart(product) {
    // If already in cart, do nothing or add quantity logic
    if (!cart.some(item => item.product_id === product.product_id)) {
      setCart([...cart, product]);
    }
  }

  // Remove product from cart
  function removeFromCart(productId) {
    setCart(cart.filter(item => item.product_id !== productId));
  }

  // Clear cart if needed
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}