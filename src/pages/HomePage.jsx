import React from 'react';
import '../styles/HomePage.css';
import ProductSection from '../components/ProductSection';

const HomePage = () => {
  return (
    <main className="container py-3">
      {/* Hero space */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-8">
          <div className="hero-card text-center shadow">
            <div className="hero-card-body py-5">
              <h1 className="hero-card-title">Welcome to DotNerdNest</h1>
              <p className="hero-card-subtitle">Tech, innovation, and comfort for your setup</p>
              <a href="/products" className="btn btn-primary hero-card-btn">Explore Products</a>
            </div>
          </div>
        </div>
      </div>
      {/* Latest Arrivals Section */}
      <section className="mb-5">
        <ProductSection title="Latest Arrivals" filter="latest" />
      </section>
      {/* Best Sellers Section */}
      <section className="mb-5">
        <ProductSection title="Best Sellers" filter="popular" />
      </section>
    </main>
  );
};

export default HomePage;

