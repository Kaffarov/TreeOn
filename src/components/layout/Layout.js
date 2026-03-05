// src/components/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import CookieConsent from '../common/CookieConsent';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;