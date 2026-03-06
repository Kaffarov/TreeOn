// src/pages/public/SpeciesGallery.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaLeaf, FaGlobeAmericas, FaTree, FaInfoCircle } from 'react-icons/fa';

const SpeciesGallery = () => {
  // Mock species data
  const speciesList = [
    {
      id: 1,
      commonName: 'Oak',
      scientificName: 'Quercus robur',
      description: 'A majestic deciduous tree, great for carbon sequestration and wildlife habitat.',
      co2Absorption: 25, // kg per year
      nativeRegion: 'Europe, North America',
      image: 'https://via.placeholder.com/300x200?text=Oak',
      growthRate: 'Medium',
      maxHeight: 30, // meters
      isFruitTree: false,
    },
    {
      id: 2,
      commonName: 'Mahogany',
      scientificName: 'Swietenia macrophylla',
      description: 'Hardwood tree prized for its timber; supports biodiversity.',
      co2Absorption: 30,
      nativeRegion: 'Central & South America',
      image: 'https://via.placeholder.com/300x200?text=Mahogany',
      growthRate: 'Fast',
      maxHeight: 40,
      isFruitTree: false,
    },
    {
      id: 3,
      commonName: 'Mangrove',
      scientificName: 'Rhizophora mangle',
      description: 'Coastal tree that protects shorelines and stores large amounts of carbon.',
      co2Absorption: 40,
      nativeRegion: 'Tropical coasts',
      image: 'https://via.placeholder.com/300x200?text=Mangrove',
      growthRate: 'Fast',
      maxHeight: 10,
      isFruitTree: false,
    },
    {
      id: 4,
      commonName: 'Pine',
      scientificName: 'Pinus sylvestris',
      description: 'Evergreen conifer, adaptable to various climates.',
      co2Absorption: 20,
      nativeRegion: 'Europe, Asia',
      image: 'https://via.placeholder.com/300x200?text=Pine',
      growthRate: 'Medium',
      maxHeight: 35,
      isFruitTree: false,
    },
    {
      id: 5,
      commonName: 'Teak',
      scientificName: 'Tectona grandis',
      description: 'Hardwood tree with durable timber; supports local economies.',
      co2Absorption: 28,
      nativeRegion: 'South Asia',
      image: 'https://via.placeholder.com/300x200?text=Teak',
      growthRate: 'Medium',
      maxHeight: 30,
      isFruitTree: false,
    },
    {
      id: 6,
      commonName: 'Coconut',
      scientificName: 'Cocos nucifera',
      description: 'Tropical palm providing food, oil, and income for farmers.',
      co2Absorption: 15,
      nativeRegion: 'Tropical Pacific',
      image: 'https://via.placeholder.com/300x200?text=Coconut',
      growthRate: 'Medium',
      maxHeight: 25,
      isFruitTree: true,
    },
    {
      id: 7,
      commonName: 'Acacia',
      scientificName: 'Acacia senegal',
      description: 'Nitrogen-fixing tree, improves soil fertility.',
      co2Absorption: 18,
      nativeRegion: 'Africa',
      image: 'https://via.placeholder.com/300x200?text=Acacia',
      growthRate: 'Fast',
      maxHeight: 15,
      isFruitTree: false,
    },
    {
      id: 8,
      commonName: 'Cedar',
      scientificName: 'Cedrus libani',
      description: 'Iconic tree with aromatic wood; long-lived.',
      co2Absorption: 22,
      nativeRegion: 'Middle East',
      image: 'https://via.placeholder.com/300x200?text=Cedar',
      growthRate: 'Slow',
      maxHeight: 40,
      isFruitTree: false,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'fruit', 'non-fruit'

  const filteredSpecies = speciesList.filter(s => {
    const matchesSearch = s.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.nativeRegion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ? true :
                          filter === 'fruit' ? s.isFruitTree :
                          !s.isFruitTree;
    return matchesSearch && matchesFilter;
  });

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
            Tree Species Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Explore the variety of trees we plant and their unique benefits.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, scientific name, or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('fruit')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'fruit' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fruit Trees
            </button>
            <button
              onClick={() => setFilter('non-fruit')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'non-fruit' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Non-Fruit
            </button>
          </div>
        </div>
      </section>

      {/* Species Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecies.map((species, idx) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
            >
              <img src={species.image} alt={species.commonName} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{species.commonName}</h3>
                  {species.isFruitTree && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Fruit</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 italic mb-2">{species.scientificName}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{species.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center">
                    <FaLeaf className="mr-1 text-primary-500" />
                    CO₂/year: {species.co2Absorption} kg
                  </div>
                  <div className="flex items-center">
                    <FaGlobeAmericas className="mr-1 text-primary-500" />
                    {species.nativeRegion}
                  </div>
                  <div className="flex items-center">
                    <FaTree className="mr-1 text-primary-500" />
                    Height: up to {species.maxHeight}m • Growth: {species.growthRate}
                  </div>
                </div>
                <button
                  className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  onClick={() => alert(`More details about ${species.commonName} (mock)`)}
                >
                  <FaInfoCircle className="mr-1" /> Learn more
                </button>
              </div>
            </motion.div>
          ))}
          {filteredSpecies.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">No species match your criteria.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpeciesGallery;