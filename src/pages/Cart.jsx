import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';

const API_BASE = 'http://localhost:3000';
const userId = 1;

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/order-items`)
      .then(res => res.json())
      .then(orderItems => {
        const cartItems = orderItems.filter(item => item.order_id === null);
        setItems(cartItems);
        setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
      });
  }, []);

  const handleQtyChange = async (itemId, qty) => {
    await fetch(`${API_BASE}/order-items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    });
    setItems(items.map(i => i.order_item_id === itemId ? { ...i, quantity: qty } : i));
    setTotal(items.map(i => i.order_item_id === itemId ? { ...i, quantity: qty } : i)
      .reduce((sum, item) => sum + item.price * item.quantity, 0));
  };

  if (!items.length) return <div className="cart-container container my-5">Your cart is empty.</div>;

  return (
    <div className="cart-container container my-5">
      <h1 className="cart-title">Cart</h1>
      <table className="cart-table table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Specs</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.order_item_id}>
              <td>{item.name}</td>
              <td>{item.specs}</td>
              <td>{item.price} €</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={e => handleQtyChange(item.order_item_id, Number(e.target.value))}
                  style={{ width: 60 }}
                  className="cart-qty-input"
                />
              </td>
              <td>{(item.price * item.quantity).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="cart-total">Total: {total.toFixed(2)} €</h3>
    </div>
  );
};

export default Cart;