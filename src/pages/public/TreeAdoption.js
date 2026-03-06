// src/pages/public/TreeAdoption.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaHeart, FaLeaf, FaMapMarkerAlt, FaCheck, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TreeAdoption = () => {
  // Mock tree data – in a real app, this could be fetched based on query param or user choice
  const tree = {
    id: 'T12345',
    species: 'Oak',
    location: 'Nakuru, Kenya',
    description: 'This majestic oak was planted in 2025 and is now thriving. It provides habitat for birds and sequesters carbon.',
    image: 'https://via.placeholder.com/600x400?text=Oak+Tree',
  };

  const adoptionPackages = [
    { id: 1, name: 'Basic', price: 25, benefits: ['Adoption certificate', 'Tree coordinates'] },
    { id: 2, name: 'Standard', price: 50, benefits: ['Adoption certificate', 'Tree coordinates', 'Personalized plaque', 'Photo update'] },
    { id: 3, name: 'Premium', price: 100, benefits: ['Adoption certificate', 'Tree coordinates', 'Plaque', 'Photo updates', 'Visit arrangement'] },
  ];

  const [selectedPackage, setSelectedPackage] = useState(adoptionPackages[0]);
  const [isAdopting, setIsAdopting] = useState(false);

  const handleAdopt = () => {
    setIsAdopting(true);
    // Simulate adoption process
    setTimeout(() => {
      setIsAdopting(false);
      toast.success(`Thank you for adopting ${tree.species} tree! You'll receive your certificate shortly.`);
    }, 1500);
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
            Adopt a Tree
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Give a tree a home and become its guardian. Your support helps maintain and protect it.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tree spotlight */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img src={tree.image} alt={tree.species} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-3/5 p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{tree.species}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-primary-500" />
                  {tree.location}
                </div>
                <p className="text-gray-700 mb-4">{tree.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaTree className="mr-1 text-primary-500" /> Tree ID: {tree.id}
                </div>
              </div>
            </div>
          </div>

          {/* Adoption packages */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Choose Your Adoption Package</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {adoptionPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 cursor-pointer transition ${
                  selectedPackage.id === pkg.id
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <h4 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h4>
                <p className="text-3xl font-bold text-primary-600 mb-4">€{pkg.price}</p>
                <ul className="space-y-2 mb-4">
                  {pkg.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <FaCheck className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {selectedPackage.id === pkg.id && (
                  <div className="text-primary-600 font-semibold text-sm">Selected</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Adoption button */}
          <div className="text-center">
            <button
              onClick={handleAdopt}
              disabled={isAdopting}
              className="bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition disabled:opacity-70 inline-flex items-center space-x-2 text-lg"
            >
              {isAdopting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaHeart />
                  <span>Adopt This Tree</span>
                </>
              )}
            </button>
          </div>

          {/* Additional info */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Your adoption helps cover tree care, monitoring, and community benefits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TreeAdoption;