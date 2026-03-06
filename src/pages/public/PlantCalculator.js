// src/pages/public/PlantCalculator.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaLeaf, FaCar, FaPlane, FaHome } from 'react-icons/fa';

const PlantCalculator = () => {
  const [co2, setCo2] = useState('');
  const [treesNeeded, setTreesNeeded] = useState(null);
  const treeSequestration = 25; // kg CO2 per tree per year

  const presets = [
    { label: 'Short flight (500 km)', co2: 150 },
    { label: 'Long flight (5000 km)', co2: 1500 },
    { label: 'Car (10,000 km)', co2: 2100 },
    { label: 'Average household (year)', co2: 4000 },
  ];

  const handleCalculate = () => {
    const val = parseFloat(co2);
    if (!isNaN(val) && val > 0) {
      setTreesNeeded(Math.ceil(val / treeSequestration));
    } else {
      setTreesNeeded(null);
    }
  };

  const handlePreset = (value) => {
    setCo2(value);
    setTreesNeeded(Math.ceil(value / treeSequestration));
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
            Tree Planting Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Find out how many trees you need to plant to offset your carbon footprint.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="co2" className="block text-sm font-medium text-gray-700 mb-1">
              Enter CO₂ (kg) you want to offset:
            </label>
            <input
              type="number"
              id="co2"
              value={co2}
              onChange={(e) => setCo2(e.target.value)}
              placeholder="e.g., 1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition mb-6"
          >
            Calculate Trees Needed
          </button>

          {treesNeeded !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-50 p-6 rounded-lg text-center"
            >
              <p className="text-lg text-gray-700 mb-2">You need to plant</p>
              <p className="text-5xl font-bold text-primary-600">{treesNeeded}</p>
              <p className="text-gray-600 mt-2">trees to offset {co2} kg CO₂ per year.</p>
              <p className="text-sm text-gray-500 mt-4">
                (Based on {treeSequestration} kg CO₂ absorbed per tree per year)
              </p>
              <Link
                to="/donate"
                className="inline-block mt-4 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                Plant {treesNeeded} Trees
              </Link>
            </motion.div>
          )}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Estimates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePreset(preset.co2)}
                  className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-left transition"
                >
                  <p className="font-medium text-gray-800">{preset.label}</p>
                  <p className="text-sm text-gray-600">{preset.co2} kg CO₂</p>
                  <p className="text-xs text-primary-600 mt-1">
                    ≈ {Math.ceil(preset.co2 / treeSequestration)} trees
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlantCalculator;