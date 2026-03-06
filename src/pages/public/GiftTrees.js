// src/pages/public/GiftTrees.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTree, FaGift, FaHeart, FaCertificate } from 'react-icons/fa';

const GiftTrees = () => {
  const navigate = useNavigate();
  const [treeCount, setTreeCount] = useState(5);
  const treeOptions = [1, 3, 5, 10, 20];
  const pricePerTree = 5; // €5 per tree

  const handleProceed = () => {
    navigate(`/gift/form?trees=${treeCount}&amount=${treeCount * pricePerTree}`);
  };

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
            Gift Trees
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Give the gift of a greener future. Choose how many trees you'd like to gift.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Number of Trees</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {treeOptions.map(num => (
              <button
                key={num}
                onClick={() => setTreeCount(num)}
                className={`px-5 py-3 border rounded-lg font-semibold transition ${
                  treeCount === num
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                }`}
              >
                {num} {num === 1 ? 'Tree' : 'Trees'}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-600">Price per tree:</span>
            <span className="font-semibold">€{pricePerTree}</span>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary-600">€{treeCount * pricePerTree}</span>
            </div>
          </div>
          <button
            onClick={handleProceed}
            className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
          >
            <FaGift />
            <span>Proceed to Gift Details</span>
          </button>
        </div>

        {/* Benefits */}
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">What's included</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <FaCertificate className="text-primary-500 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Personalized Certificate</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <FaTree className="text-primary-500 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Geotagged Trees</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <FaHeart className="text-primary-500 text-3xl mx-auto mb-2" />
              <p className="font-semibold">Impact Tracking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftTrees;