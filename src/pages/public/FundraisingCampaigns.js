// src/pages/public/FundraisingCampaigns.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaUsers, FaClock, FaPlus } from 'react-icons/fa';

const FundraisingCampaigns = () => {
  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      title: 'Restore the Amazon Rainforest',
      organizer: 'TreeOn Foundation',
      goal: 50000,
      raised: 32450,
      daysLeft: 15,
      donors: 187,
      image: 'https://via.placeholder.com/400x200?text=Amazon+Campaign',
      category: 'Forest',
    },
    {
      id: 2,
      title: 'Mangrove Restoration - Philippines',
      organizer: 'TreeOn Philippines',
      goal: 30000,
      raised: 18450,
      daysLeft: 10,
      donors: 98,
      image: 'https://via.placeholder.com/400x200?text=Mangroves',
      category: 'Coastal',
    },
    {
      id: 3,
      title: 'Reforest Kenya',
      organizer: 'TreeOn Kenya',
      goal: 40000,
      raised: 22300,
      daysLeft: 22,
      donors: 132,
      image: 'https://via.placeholder.com/400x200?text=Kenya',
      category: 'Savanna',
    },
    {
      id: 4,
      title: 'Fruit Trees for Farmers',
      organizer: 'TreeOn Brazil',
      goal: 25000,
      raised: 12750,
      daysLeft: 18,
      donors: 64,
      image: 'https://via.placeholder.com/400x200?text=Fruit+Trees',
      category: 'Agroforestry',
    },
    {
      id: 5,
      title: 'Borneo Rainforest Protection',
      organizer: 'TreeOn Indonesia',
      goal: 60000,
      raised: 39800,
      daysLeft: 30,
      donors: 215,
      image: 'https://via.placeholder.com/400x200?text=Borneo',
      category: 'Rainforest',
    },
    {
      id: 6,
      title: 'Ethiopian Highlands Reforestation',
      organizer: 'TreeOn Ethiopia',
      goal: 35000,
      raised: 15200,
      daysLeft: 12,
      donors: 76,
      image: 'https://via.placeholder.com/400x200?text=Ethiopia',
      category: 'Highland',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Get unique categories for filter
  const categories = ['all', ...new Set(campaigns.map(c => c.category))];

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || c.category === filter;
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
            Fundraising Campaigns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Support grassroots reforestation projects around the world. Every contribution counts.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="container mx-auto px-4 pb-16">
        {filteredCampaigns.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, idx) => {
              const progress = (campaign.raised / campaign.goal) * 100;
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100"
                >
                  <img src={campaign.image} alt={campaign.title} className="w-full h-40 object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{campaign.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">by {campaign.organizer}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-primary-600">€{campaign.raised.toLocaleString()}</span>
                        <span className="text-gray-500">of €{campaign.goal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                      <span className="flex items-center"><FaUsers className="mr-1" /> {campaign.donors} donors</span>
                      <span className="flex items-center"><FaClock className="mr-1" /> {campaign.daysLeft} days left</span>
                    </div>
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="mt-4 inline-block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                    >
                      View Campaign
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>No campaigns match your search.</p>
          </div>
        )}
      </section>

      {/* Start a Campaign CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Have a project in mind?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Start your own fundraising campaign to support reforestation in your community.
          </p>
          <Link
            to="/campaigns/create"
            className="inline-flex items-center bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition space-x-2"
          >
            <FaPlus />
            <span>Start a Campaign</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FundraisingCampaigns;