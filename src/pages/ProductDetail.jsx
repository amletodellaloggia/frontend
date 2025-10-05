import React, { useEffect, useState } from 'react';
import '../styles/ProductDetail.css';
import { useParams } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  const handleAddToCart = async () => {
    const userId = 1;
    const res = await fetch(`${API_BASE}/order-items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: null,
        product_id: product.product_id,
        name: product.name,
        description: product.description,
        specs: product.specs,
        price: product.price,
        quantity: quantity,
        price_at_purchase: product.price
      })
    });
    if (res.ok) setAdded(true);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container container my-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img src={product.image_url} alt={product.name} className="product-detail-img img-fluid rounded shadow" />
        </div>
        <div className="col-md-7 product-detail-info">
          <h2 className="product-detail-title">{product.name}</h2>
          <p className="product-detail-brand">{product.brand}</p>
          <p>{product.description}</p>
          <p><strong>Specs:</strong> {product.specs}</p>
          <p className="product-detail-price">{product.price} €</p>
          <div className="product-detail-qty-select d-flex align-items-center">
            <label className="me-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              min={1}
              max={product.stock_quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>
          <button className="btn btn-success product-detail-add-btn mt-3" onClick={handleAddToCart} disabled={added}>
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;