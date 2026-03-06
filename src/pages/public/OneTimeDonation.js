// src/pages/public/OneTimeDonation.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTree, FaLeaf, FaArrowRight } from 'react-icons/fa';

const OneTimeDonation = () => {
  const navigate = useNavigate();
  const [treeCount, setTreeCount] = useState(5);
  const [customCount, setCustomCount] = useState('');
  const pricePerTree = 5; // €

  const presetOptions = [1, 5, 10, 20, 50];

  const handlePresetSelect = (num) => {
    setTreeCount(num);
    setCustomCount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomCount(val);
    if (val && !isNaN(val) && parseInt(val) > 0) {
      setTreeCount(parseInt(val));
    }
  };

  const handleProceed = () => {
    if (treeCount > 0) {
      navigate(`/checkout?trees=${treeCount}&amount=${treeCount * pricePerTree}`);
    }
  };

  const total = treeCount * pricePerTree;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            One-Time Donation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Make a direct impact today. Choose how many trees to plant, and we'll take care of the rest.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Number of Trees</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {presetOptions.map(num => (
              <button
                key={num}
                onClick={() => handlePresetSelect(num)}
                className={`px-5 py-3 border rounded-lg font-semibold transition ${
                  treeCount === num && customCount === ''
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                }`}
              >
                {num} {num === 1 ? 'Tree' : 'Trees'}
              </button>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="custom" className="block text-sm font-medium text-gray-700 mb-1">
              Or enter custom number
            </label>
            <input
              type="number"
              id="custom"
              min="1"
              value={customCount}
              onChange={handleCustomChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 15"
            />
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Price per tree:</span>
              <span className="font-semibold">€{pricePerTree}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold mt-2">
              <span>Total:</span>
              <span className="text-primary-600">€{total}</span>
            </div>
          </div>
          <button
            onClick={handleProceed}
            disabled={treeCount <= 0}
            className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>Proceed to Checkout</span>
            <FaArrowRight />
          </button>
        </div>

        {/* Additional info */}
        <div className="max-w-2xl mx-auto mt-8 text-center text-sm text-gray-500">
          <p>
            Your donation will plant trees in partnership with local farmers. You'll receive a certificate and can track your trees on our map.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OneTimeDonation;