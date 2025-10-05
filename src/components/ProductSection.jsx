import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title, filter }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Filtering logic
  let filteredProducts = products;
  if (filter === 'latest') {
    filteredProducts = [...products]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6); // show latest 6
  } else if (filter === 'popular') {
    filteredProducts = [...products]
      .sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
      .slice(0, 6); // show best 6 sellers
  }

  return (
    <section className="product-section mb-5">
      <h2 className="mb-4">{title}</h2>
      <div className="container">
        <div className="row">
          {filteredProducts.map(product => (
            <div className="col-md-4 mb-4" key={product.product_id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

