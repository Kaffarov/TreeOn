// src/pages/public/SuccessStories.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaQuoteRight, 
  FaTree, 
  FaLeaf, 
  FaUserTie,
  FaHandsHelping,
  FaGlobeAmericas
} from 'react-icons/fa';

const SuccessStories = () => {
  const [filter, setFilter] = useState('all');

  // Mock stories data
  const stories = [
    {
      id: 1,
      name: 'Maria Santos',
      role: 'Farmer, Philippines',
      category: 'farmer',
      quote: 'TreeOn transformed my small farm into a thriving agroforest. I now have over 300 trees providing fruit, shade, and income for my family.',
      impact: '320 trees • 2 hectares restored',
      image: 'https://via.placeholder.com/400x400?text=Maria+Santos',
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Monthly Donor, Singapore',
      category: 'donor',
      quote: 'I love tracking my trees on the map. Every month I see new green dots appearing. It’s amazing to know I’m part of something bigger.',
      impact: '45 trees planted • 1.1 tons CO₂ offset',
      image: 'https://via.placeholder.com/400x400?text=David+Chen',
    },
    {
      id: 3,
      name: 'John Kamau',
      role: 'Farmer, Kenya',
      category: 'farmer',
      quote: 'The training from TreeOn taught me sustainable practices. Now my land is greener, and I’m teaching my neighbors.',
      impact: '280 trees • 2.5 hectares',
      image: 'https://via.placeholder.com/400x400?text=John+Kamau',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Donor, UK',
      category: 'donor',
      quote: 'I gifted trees to my wedding guests instead of favors. Everyone loved the certificates, and we’re building a forest together!',
      impact: '50 trees • Wedding Forest',
      image: 'https://via.placeholder.com/400x400?text=Emma+Wilson',
    },
    {
      id: 5,
      name: 'Green Valley Community',
      role: 'Community Group, Brazil',
      category: 'community',
      quote: 'Our village united to restore the riverbank. With TreeOn’s support, we’ve planted over 1,000 trees and seen wildlife return.',
      impact: '1,200 trees • 5 hectares',
      image: 'https://via.placeholder.com/400x400?text=Green+Valley',
    },
    {
      id: 6,
      name: 'Carlos Mendez',
      role: 'Planter, Colombia',
      category: 'planter',
      quote: 'Working as a planter gives me purpose. Every tree I put in the ground is a step toward a healthier planet.',
      impact: '2,500+ trees planted',
      image: 'https://via.placeholder.com/400x400?text=Carlos+Mendez',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Stories', icon: FaGlobeAmericas },
    { id: 'farmer', label: 'Farmers', icon: FaUserTie },
    { id: 'donor', label: 'Donors', icon: FaHandsHelping },
    { id: 'community', label: 'Communities', icon: FaLeaf },
    { id: 'planter', label: 'Planters', icon: FaTree },
  ];

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Real people, real impact – meet the TreeOn community.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                filter === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100'
              }`}
            >
              <cat.icon />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100"
            >
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                  {story.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-3">
                  <FaQuoteRight className="text-primary-300 text-2xl mr-2 flex-shrink-0" />
                  <p className="text-gray-600 italic text-sm">"{story.quote}"</p>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{story.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{story.role}</p>
                <div className="border-t border-gray-100 pt-3 mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">Impact:</span> {story.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredStories.length === 0 && (
            <p className="text-center text-gray-500 col-span-full py-12">No stories in this category yet.</p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Share Your Story</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Have you been impacted by TreeOn? We'd love to hear your story and feature you here.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;