// src/pages/donor/Wishlist.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTree, 
  FaHeart, 
  FaRegHeart, 
  FaShoppingCart,
  FaTimes,
  FaSeedling
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  // Mock wishlist data
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      species: 'Oak',
      description: 'A majestic shade tree, great for carbon sequestration.',
      image: 'https://via.placeholder.com/300x200?text=Oak',
      price: 25,
      savedDate: '2026-02-15',
    },
    {
      id: 2,
      species: 'Mangrove',
      description: 'Coastal protector, excellent for biodiversity.',
      image: 'https://via.placeholder.com/300x200?text=Mangrove',
      price: 20,
      savedDate: '2026-02-10',
    },
    {
      id: 3,
      species: 'Mahogany',
      description: 'Hardwood tree, long-lived and valuable.',
      image: 'https://via.placeholder.com/300x200?text=Mahogany',
      price: 30,
      savedDate: '2026-01-28',
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const plantNow = (species) => {
    toast.success(`Proceeding to plant ${species} (mock)`);
    // In real app, redirect to donation page with preselected species
  };

  const plantAll = () => {
    toast.success(`Planting all ${wishlist.length} trees (mock)`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              Trees you've saved to plant later.
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={plantAll}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
            >
              <FaSeedling />
              <span>Plant All</span>
            </button>
          )}
        </motion.div>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition relative"
              >
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition z-10"
                  title="Remove from wishlist"
                >
                  <FaTimes className="text-gray-500" />
                </button>
                <img src={item.image} alt={item.species} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.species}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaHeart className="text-red-500 mr-1" />
                    Saved on {item.savedDate}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary-600">€{item.price}</span>
                    <button
                      onClick={() => plantNow(item.species)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 text-sm"
                    >
                      <FaSeedling />
                      <span>Plant Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-12 text-center"
          >
            <FaRegHeart className="text-5xl mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Browse trees and save your favorites to plant later.
            </p>
            <Link
              to="/species"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              Explore Trees
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;