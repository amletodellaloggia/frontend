import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
// Context
import { useCart } from '../context/CartContext';
// Cart summary
import CartSummary from '../components/CartSummary';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Check if product is already in cart
  const inCart = cart.some(item => item.product_id === product.product_id);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:3000/images/${product.image_url}`}
            alt={product.name}
            className="product-detail-img img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price} €</p>
          <p>Brand: {product.brand}</p>
          <div className="my-3">
            {!inCart ? (
              <button
                className="btn btn-success"
                onClick={() => addToCart(product)}
                title="Add to cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(product.product_id)}
                title="Remove from cart"
              >
                <FontAwesomeIcon icon={faCartArrowDown} />
              </button>
            )}
          </div>
          <div className="mt-4">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;