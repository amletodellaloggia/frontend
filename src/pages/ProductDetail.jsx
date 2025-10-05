import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
          <button
            className="btn btn-success"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;