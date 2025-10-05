import React from 'react';
import '../styles/DefaultLayout.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <main className="default-main container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
