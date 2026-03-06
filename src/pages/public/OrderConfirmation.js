// src/pages/public/OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTree, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const OrderConfirmation = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('orderId') || 'ORD-' + Math.floor(Math.random() * 1000000);

  // Mock order details – in a real app, fetch from API using orderId
  const [order, setOrder] = useState({
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    trees: 10,
    amount: 50.00,
    paymentMethod: 'Credit Card',
    email: 'customer@example.com',
  });

  useEffect(() => {
    // You could fetch order details here
    // For now, just show a success toast
    toast.success('Thank you for your donation!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">Your donation has been successfully processed.</p>

          <div className="bg-primary-50 p-6 rounded-lg mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trees planted:</span>
                <span className="font-semibold">{order.trees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-primary-600">€{order.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment method:</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
            <FaEnvelope className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <p className="text-sm text-blue-800 text-left">
              A confirmation email has been sent to <span className="font-semibold">{order.email}</span>. Your certificate and tracking details will be available soon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition space-x-2"
            >
              <FaTree />
              <span>View My Trees</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition space-x-2"
            >
              <span>Back to Home</span>
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;