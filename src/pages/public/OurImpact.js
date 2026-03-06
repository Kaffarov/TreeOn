// src/pages/public/OurImpact.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaLeaf, 
  FaHandsHelping, 
  FaGlobeAmericas,
  FaChartLine,
  FaSeedling
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const OurImpact = () => {
  // Mock impact data
  const stats = [
    { label: 'Trees Planted', value: '58,420', icon: FaTree, color: 'bg-green-500' },
    { label: 'CO₂ Offset (tons)', value: '1,460', icon: FaLeaf, color: 'bg-blue-500' },
    { label: 'Partner Farmers', value: '287', icon: FaHandsHelping, color: 'bg-amber-500' },
    { label: 'Countries Reached', value: '12', icon: FaGlobeAmericas, color: 'bg-purple-500' },
  ];

  // Monthly trees planted data (for chart)
  const monthlyData = [
    { month: 'Jan', trees: 420 },
    { month: 'Feb', trees: 580 },
    { month: 'Mar', trees: 690 },
    { month: 'Apr', trees: 810 },
    { month: 'May', trees: 940 },
    { month: 'Jun', trees: 1120 },
    { month: 'Jul', trees: 1350 },
    { month: 'Aug', trees: 1480 },
    { month: 'Sep', trees: 1620 },
    { month: 'Oct', trees: 1790 },
    { month: 'Nov', trees: 1930 },
    { month: 'Dec', trees: 2100 },
  ];

  // Species distribution
  const speciesData = [
    { name: 'Oak', value: 15420, color: '#2e8b57' },
    { name: 'Mahogany', value: 12350, color: '#f39c12' },
    { name: 'Mangrove', value: 10230, color: '#3498db' },
    { name: 'Pine', value: 8760, color: '#9b59b6' },
    { name: 'Other', value: 11660, color: '#95a5a6' },
  ];

  // Success stories
  const stories = [
    { id: 1, name: 'Maria Santos', location: 'Philippines', impact: '320 trees planted, restored 2 hectares', image: 'https://via.placeholder.com/300x200?text=Maria' },
    { id: 2, name: 'John Kamau', location: 'Kenya', impact: '280 trees, improved soil and water retention', image: 'https://via.placeholder.com/300x200?text=John' },
    { id: 3, name: 'Carlos Rodriguez', location: 'Brazil', impact: '450 trees in the Amazon', image: 'https://via.placeholder.com/300x200?text=Carlos' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaChartLine className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Impact</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Together, we're making a measurable difference for the planet and its people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center border border-gray-100"
            >
              <div className={`${stat.color} w-16 h-16 rounded-lg flex items-center justify-center text-white text-3xl mr-4`}>
                <stat.icon />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            Our Growth
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Line chart - monthly trees */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Trees Planted</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="trees" stroke="#2e8b57" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart - species distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tree Species Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={speciesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label
                  >
                    {speciesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-800 mb-12"
        >
          Success Stories
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{story.location}</p>
                <p className="text-gray-600">{story.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/stories"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Read More Stories
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Impact</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your support helps us plant more trees, empower more farmers, and restore more land.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            Plant a Tree Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurImpact;