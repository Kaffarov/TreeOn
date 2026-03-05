// src/pages/public/MeetFarmers.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaTree, 
  FaSearch, 
  FaFilter,
  FaQuoteRight
} from 'react-icons/fa';

const MeetFarmers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  // Mock farmers data
  const farmers = [
    {
      id: 'F001',
      name: 'Maria Santos',
      location: 'Davao, Philippines',
      region: 'Asia',
      trees: 320,
      story: 'I’ve been planting with TreeOn for three years. The trees have restored our soil and now provide fruit for my family.',
      image: 'https://via.placeholder.com/400x400?text=Maria+Santos',
    },
    {
      id: 'F002',
      name: 'John Kamau',
      location: 'Nakuru, Kenya',
      region: 'Africa',
      trees: 280,
      story: 'TreeOn helped me turn my small farm into a forest. I now teach my neighbors about agroforestry.',
      image: 'https://via.placeholder.com/400x400?text=John+Kamau',
    },
    {
      id: 'F003',
      name: 'Carlos Rodriguez',
      location: 'Amazonas, Brazil',
      region: 'South America',
      trees: 450,
      story: 'We’re restoring the rainforest one tree at a time. My children will inherit a healthier planet.',
      image: 'https://via.placeholder.com/400x400?text=Carlos+Rodriguez',
    },
    {
      id: 'F004',
      name: 'Dewi Lestari',
      location: 'Kalimantan, Indonesia',
      region: 'Asia',
      trees: 380,
      story: 'Planting mangroves has protected our village from storms and brought back fish.',
      image: 'https://via.placeholder.com/400x400?text=Dewi+Lestari',
    },
    {
      id: 'F005',
      name: 'Tsegaye Abera',
      location: 'Oromia, Ethiopia',
      region: 'Africa',
      trees: 195,
      story: 'With TreeOn’s training, I’ve learned sustainable farming and now earn extra income from fruit trees.',
      image: 'https://via.placeholder.com/400x400?text=Tsegaye+Abera',
    },
    {
      id: 'F006',
      name: 'Ana Silva',
      location: 'Bahia, Brazil',
      region: 'South America',
      trees: 260,
      story: 'I love seeing the birds return to our land. TreeOn makes me feel part of a global movement.',
      image: 'https://via.placeholder.com/400x400?text=Ana+Silva',
    },
  ];

  const regions = ['all', ...new Set(farmers.map(f => f.region))];

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         f.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'all' || f.region === regionFilter;
    return matchesSearch && matchesRegion;
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
            Meet Our Farmers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            The heart of TreeOn – dedicated individuals nurturing our forests and their communities.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search farmers by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Farmers Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFarmers.map((farmer, index) => (
            <motion.div
              key={farmer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{farmer.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-1 text-primary-500" />
                  {farmer.location}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaTree className="mr-1 text-primary-500" />
                  {farmer.trees} trees planted
                </div>
                <div className="relative mb-4">
                  <FaQuoteRight className="absolute -top-1 -left-1 text-primary-200 text-3xl opacity-50" />
                  <p className="text-gray-600 italic pl-6 text-sm">{farmer.story}</p>
                </div>
                <Link
                  to={`/farmers/${farmer.id}`}
                  className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
          {filteredFarmers.length === 0 && (
            <p className="text-center text-gray-500 col-span-full py-12">No farmers match your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MeetFarmers;