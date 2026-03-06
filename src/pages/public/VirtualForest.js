// src/pages/public/VirtualForest.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaGlobe, FaUser, FaSeedling } from 'react-icons/fa';

const VirtualForest = () => {
  const [view, setView] = useState('global'); // 'global' or 'my'

  // Mock tree data – in a real app, this would come from an API
  const globalTrees = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 30,
    species: ['Oak', 'Pine', 'Mahogany', 'Mangrove'][Math.floor(Math.random() * 4)],
    donor: Math.random() > 0.3 ? 'Anonymous' : 'TreeOn Community',
  }));

  const myTrees = [
    { id: 1, x: 20, y: 30, size: 35, species: 'Oak', donor: 'You' },
    { id: 2, x: 45, y: 60, size: 28, species: 'Mahogany', donor: 'You' },
    { id: 3, x: 70, y: 20, size: 42, species: 'Mangrove', donor: 'You' },
    { id: 4, x: 30, y: 80, size: 25, species: 'Pine', donor: 'You' },
  ];

  const trees = view === 'global' ? globalTrees : myTrees;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Virtual Forest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Explore our living forest – every dot represents a tree planted by our community.
          </motion.p>
        </div>
      </section>

      {/* View toggle */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setView('global')}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2 ${
              view === 'global'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaGlobe />
            <span>Global Forest</span>
          </button>
          <button
            onClick={() => setView('my')}
            className={`px-6 py-3 rounded-lg font-semibold transition flex items-center space-x-2 ${
              view === 'my'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaUser />
            <span>My Trees</span>
          </button>
        </div>
      </div>

      {/* Forest visualization */}
      <section className="container mx-auto px-4 pb-16">
        <div className="relative bg-green-800 rounded-2xl shadow-2xl overflow-hidden" style={{ height: '600px' }}>
          {/* Background gradient to simulate sky/ground */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-green-700"></div>
          {/* Animated forest */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {trees.map((tree) => (
                <motion.div
                  key={tree.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${tree.x}%`,
                    top: `${tree.y}%`,
                    width: tree.size,
                    height: tree.size,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-full h-full">
                    <FaTree
                      className="text-green-600 drop-shadow-lg group-hover:text-green-400 transition-colors"
                      style={{ fontSize: tree.size }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                      {tree.species} – {tree.donor}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 rounded-lg p-3 shadow-lg">
            <p className="text-sm font-semibold text-gray-800">
              {view === 'global' ? 'Global Forest' : 'My Trees'}
            </p>
            <p className="text-xs text-gray-600">{trees.length} trees shown</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          {view === 'global'
            ? 'This is a representation of our global forest. Each tree icon corresponds to a real tree planted by TreeOn.'
            : 'Here are the trees you have planted. Hover over them to see details.'}
        </p>
      </section>
    </div>
  );
};

export default VirtualForest;