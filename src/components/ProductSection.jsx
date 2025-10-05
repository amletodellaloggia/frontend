import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;

