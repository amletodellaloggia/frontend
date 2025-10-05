import React, { useState } from 'react';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';

const API_BASE = 'http://localhost:3000';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${API_BASE}/products?search=${query}&sort=${sort}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  return (
    <main className="container py-3">
      <form className="search-page-form mb-4" onSubmit={handleSearch}>
        <input
          className="form-control"
          type="search"
          placeholder="Search product..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="recent">Recent</option>
        </select>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
      {loading ? <div>Loading...</div> :
        <div className="search-results-row row">
          {products.map(p => (
            <div key={p.product_id} className="col-md-4 mb-4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      }
    </main>
  );
};

export default SearchPage;