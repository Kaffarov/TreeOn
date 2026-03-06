// src/pages/public/SpeciesSelector.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaGlobeAmericas, FaTree, FaCheck } from 'react-icons/fa';

const SpeciesSelector = () => {
  const navigate = useNavigate();

  // Mock species data
  const speciesList = [
    {
      id: 1,
      commonName: 'Oak',
      scientificName: 'Quercus robur',
      co2Absorption: 25,
      nativeRegion: 'Europe, North America',
      image: 'https://via.placeholder.com/300x200?text=Oak',
      pricePerTree: 5,
    },
    {
      id: 2,
      commonName: 'Mahogany',
      scientificName: 'Swietenia macrophylla',
      co2Absorption: 30,
      nativeRegion: 'Central & South America',
      image: 'https://via.placeholder.com/300x200?text=Mahogany',
      pricePerTree: 6,
    },
    {
      id: 3,
      commonName: 'Mangrove',
      scientificName: 'Rhizophora mangle',
      co2Absorption: 40,
      nativeRegion: 'Tropical coasts',
      image: 'https://via.placeholder.com/300x200?text=Mangrove',
      pricePerTree: 5,
    },
    {
      id: 4,
      commonName: 'Pine',
      scientificName: 'Pinus sylvestris',
      co2Absorption: 20,
      nativeRegion: 'Europe, Asia',
      image: 'https://via.placeholder.com/300x200?text=Pine',
      pricePerTree: 4,
    },
    {
      id: 5,
      commonName: 'Teak',
      scientificName: 'Tectona grandis',
      co2Absorption: 28,
      nativeRegion: 'South Asia',
      image: 'https://via.placeholder.com/300x200?text=Teak',
      pricePerTree: 7,
    },
    {
      id: 6,
      commonName: 'Coconut',
      scientificName: 'Cocos nucifera',
      co2Absorption: 15,
      nativeRegion: 'Tropical Pacific',
      image: 'https://via.placeholder.com/300x200?text=Coconut',
      pricePerTree: 5,
    },
  ];

  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setQuantity(val);
  };

  const handlePlant = () => {
    if (!selectedSpecies) {
      alert('Please select a tree species.');
      return;
    }
    // Navigate to checkout with species and quantity
    const total = selectedSpecies.pricePerTree * quantity;
    navigate(`/checkout?species=${selectedSpecies.id}&trees=${quantity}&amount=${total}`);
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
            Choose Your Tree Species
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Select the type of tree you'd like to plant. Each species has unique benefits.
          </motion.p>
        </div>
      </section>

      {/* Species Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speciesList.map((species, idx) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 cursor-pointer transition hover:shadow-xl ${
                selectedSpecies?.id === species.id
                  ? 'border-primary-500 ring-2 ring-primary-300'
                  : 'border-gray-200'
              }`}
              onClick={() => handleSelect(species)}
            >
              <img src={species.image} alt={species.commonName} className="w-full h-48 object-cover" />
              <div className="p-5 relative">
                {selectedSpecies?.id === species.id && (
                  <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                    <FaCheck />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800">{species.commonName}</h3>
                <p className="text-sm text-gray-500 italic mb-2">{species.scientificName}</p>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <FaLeaf className="mr-2 text-primary-500" />
                    CO₂/year: {species.co2Absorption} kg
                  </div>
                  <div className="flex items-center">
                    <FaGlobeAmericas className="mr-2 text-primary-500" />
                    {species.nativeRegion}
                  </div>
                </div>
                <p className="text-lg font-semibold text-primary-600">€{species.pricePerTree} per tree</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Selection Summary & Quantity */}
      {selectedSpecies && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 container mx-auto px-4 pb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Selection</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold">{selectedSpecies.commonName}</p>
                <p className="text-sm text-gray-500">€{selectedSpecies.pricePerTree} each</p>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary-600">€{selectedSpecies.pricePerTree * quantity}</span>
              </div>
            </div>
            <button
              onClick={handlePlant}
              className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition"
            >
              Plant {quantity} {quantity === 1 ? 'Tree' : 'Trees'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpeciesSelector;