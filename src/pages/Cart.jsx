import React from 'react';

const Cart = ({ cart, onQuantityChange, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => onQuantityChange(item.product_id, parseInt(e.target.value))}
                    style={{ width: "60px" }}
                  />
                </td>
                <td>{item.price} €</td>
                <td>{item.price * item.quantity} €</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.product_id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-end">
        <h4>Total: {total} €</h4>
      </div>
    </div>
  );
};

export default Cart;