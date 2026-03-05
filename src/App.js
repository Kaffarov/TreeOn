// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import FarmerLayout from './components/layout/FarmerLayout';
import DonorLayout from './components/layout/DonorLayout';

// Import all routes
import { publicRoutes, donorRoutes, farmerRoutes, adminRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <ThemeProvider>
              <Router>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#2e8b57',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 4000,
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                
                <Routes>
                  {/* Public Routes with Main Layout */}
                  <Route path="/" element={<Layout />}>
                    {publicRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Route>

                  {/* Donor Routes with Donor Layout */}
                  <Route path="/dashboard" element={<DonorLayout />}>
                    {donorRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Route>

                  {/* Farmer Routes with Farmer Layout */}
                  <Route path="/farmer" element={<FarmerLayout />}>
                    {farmerRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Route>

                  {/* Admin Routes with Admin Layout */}
                  <Route path="/admin" element={<AdminLayout />}>
                    {adminRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Route>
                </Routes>
              </Router>
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;