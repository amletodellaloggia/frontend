import React, { useEffect, useState } from 'react';
import '../styles/ProductSection.css';
import ProductCard from './ProductCard';

const API_BASE = 'http://localhost:3000';

const ProductSection = ({ title, filter, scrollable = false }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let query = '';
    if (filter === 'latest') query = '?sort=recent';
    if (filter === 'popular') query = '?sort=popular';

    fetch(`${API_BASE}/products${query}`)
      .then(res => res.json())
      .then(setProducts);
  }, [filter]);

  return (
    <section className="product-section">
      {title && <h2 className="product-section-title">{title}</h2>}
      <div className={scrollable ? 'product-section-scrollable' : ''}>
        <div className={scrollable ? 'd-flex flex-row product-section-row' : 'row product-section-row'}>
          {products.map(p => (
            <div key={p.product_id} className={scrollable ? '' : 'col-md-4'}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

