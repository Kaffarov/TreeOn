// src/pages/public/FarmerProfile.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaTree, 
  FaLeaf, 
  FaCalendarAlt, 
  FaQuoteRight,
  FaArrowLeft
} from 'react-icons/fa';

const FarmerProfile = () => {
  const { id } = useParams();

  // Mock farmers data (in real app, fetch based on id)
  const farmers = [
    {
      id: 'F001',
      name: 'Maria Santos',
      location: 'Davao, Philippines',
      image: 'https://via.placeholder.com/400x400?text=Maria+Santos',
      joinDate: '2024-03-15',
      treesPlanted: 320,
      landSize: 3.5,
      story: 'Maria has been partnering with TreeOn for over two years. She transformed her small farm into a thriving agroforest, planting native trees and fruit trees. The trees have restored the soil, provided shade, and now offer a sustainable income from fruits. Maria also trains other farmers in her community.',
      quote: 'TreeOn gave me hope and practical knowledge. Now my land is greener, and my family has a better future.',
      trees: [
        { id: 'T12345', species: 'Mangrove', plantedDate: '2025-06-15', status: 'alive' },
        { id: 'T12347', species: 'Coconut', plantedDate: '2025-09-10', status: 'alive' },
        { id: 'T12352', species: 'Banana', plantedDate: '2026-01-20', status: 'alive' },
      ],
    },
    {
      id: 'F002',
      name: 'John Kamau',
      location: 'Nakuru, Kenya',
      image: 'https://via.placeholder.com/400x400?text=John+Kamau',
      joinDate: '2024-05-20',
      treesPlanted: 280,
      landSize: 2.8,
      story: 'John joined TreeOn after attending a training session. He has planted over 280 trees on his land, including indigenous species that have improved water retention. He now teaches his neighbors about agroforestry.',
      quote: 'I never thought my small farm could make such a difference. Now I see birds returning and the soil is rich again.',
      trees: [
        { id: 'T12346', species: 'Acacia', plantedDate: '2025-08-01', status: 'alive' },
        { id: 'T12349', species: 'Grevillea', plantedDate: '2025-10-12', status: 'alive' },
      ],
    },
  ];

  const farmer = farmers.find(f => f.id === id) || farmers[0]; // fallback

  if (!farmer) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Farmer not found</h2>
          <Link to="/farmers/list" className="text-primary-600 hover:underline">
            Back to Farmers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/farmers/list" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition">
          <FaArrowLeft className="mr-2" /> Back to Farmers
        </Link>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={farmer.image}
              alt={farmer.name}
              className="w-48 h-48 rounded-full border-4 border-white object-cover"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold">{farmer.name}</h1>
              <div className="flex items-center text-lg mt-2">
                <FaMapMarkerAlt className="mr-2" />
                {farmer.location}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <FaTree className="text-3xl text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{farmer.treesPlanted}</p>
            <p className="text-gray-600">Trees Planted</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <FaLeaf className="text-3xl text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{farmer.landSize} ha</p>
            <p className="text-gray-600">Land Size</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
            <FaCalendarAlt className="text-3xl text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{farmer.joinDate}</p>
            <p className="text-gray-600">Joined</p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="relative">
            <FaQuoteRight className="absolute -top-4 -left-4 text-primary-200 text-5xl opacity-50" />
            <p className="text-xl text-gray-700 italic relative z-10 px-8">
              "{farmer.quote}"
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Farmer's Story</h2>
        <p className="text-gray-700 leading-relaxed">{farmer.story}</p>
      </section>

      {/* Trees they care for */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trees on Their Land</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-600">Tree ID</th>
                  <th className="text-left py-3 text-gray-600">Species</th>
                  <th className="text-left py-3 text-gray-600">Planted</th>
                  <th className="text-left py-3 text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {farmer.trees.map(tree => (
                  <tr key={tree.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-mono text-sm">{tree.id}</td>
                    <td className="py-3">{tree.species}</td>
                    <td className="py-3">{tree.plantedDate}</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        {tree.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerProfile;