// src/pages/donor/MyImpact.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaLeaf, 
  FaGlobeAmericas, 
  FaSeedling, 
  FaShareAlt,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const MyImpact = () => {
  // Mock impact data
  const impact = {
    totalTrees: 47,
    co2Offset: 1.2, // tons
    countries: 3,
    speciesCount: 5,
    thisYearTrees: 12,
    nextMilestone: 50,
    progressToNext: 47 / 50 * 100,
  };

  // Monthly data for line chart
  const monthlyData = [
    { month: 'Jan', trees: 2 },
    { month: 'Feb', trees: 3 },
    { month: 'Mar', trees: 5 },
    { month: 'Apr', trees: 4 },
    { month: 'May', trees: 6 },
    { month: 'Jun', trees: 7 },
    { month: 'Jul', trees: 5 },
    { month: 'Aug', trees: 8 },
    { month: 'Sep', trees: 3 },
    { month: 'Oct', trees: 2 },
    { month: 'Nov', trees: 1 },
    { month: 'Dec', trees: 1 },
  ];

  // Species distribution
  const speciesData = [
    { name: 'Oak', value: 15, color: '#2e8b57' },
    { name: 'Mahogany', value: 12, color: '#f39c12' },
    { name: 'Mangrove', value: 10, color: '#3498db' },
    { name: 'Pine', value: 7, color: '#9b59b6' },
    { name: 'Other', value: 3, color: '#95a5a6' },
  ];

  // Recent contributions (mock)
  const recentContributions = [
    { date: '2026-02-15', type: 'Subscription', trees: 1, description: 'Monthly allocation - Premium' },
    { date: '2026-01-20', type: 'One-time', trees: 5, description: 'Donation for Amazon project' },
    { date: '2026-01-15', type: 'Subscription', trees: 1, description: 'Monthly allocation - Premium' },
    { date: '2025-12-15', type: 'Subscription', trees: 1, description: 'Monthly allocation - Premium' },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText('Check out my impact on TreeOn: I have planted 47 trees! 🌳');
    toast.success('Impact summary copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Impact</h1>
            <p className="text-gray-600 mt-2">Track the positive change you've made.</p>
          </div>
          <button
            onClick={handleShare}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaShareAlt />
            <span>Share Impact</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaTree className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Trees</p>
              <p className="text-2xl font-bold text-gray-800">{impact.totalTrees}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaLeaf className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">CO₂ Offset (tons)</p>
              <p className="text-2xl font-bold text-gray-800">{impact.co2Offset}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaGlobeAmericas className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Countries</p>
              <p className="text-2xl font-bold text-gray-800">{impact.countries}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FaSeedling className="text-amber-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Species</p>
              <p className="text-2xl font-bold text-gray-800">{impact.speciesCount}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <FaChartLine className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">This Year</p>
              <p className="text-2xl font-bold text-gray-800">{impact.thisYearTrees}</p>
            </div>
          </motion.div>
        </div>

        {/* Progress toward next milestone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">Next Milestone: {impact.nextMilestone} Trees</h2>
            <span className="text-primary-600 font-semibold">{impact.progressToNext.toFixed(0)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${impact.progressToNext}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            You need {impact.nextMilestone - impact.totalTrees} more trees to reach the next milestone.
          </p>
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trees */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Trees Planted</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trees" stroke="#2e8b57" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Species Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trees by Species</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
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

        {/* Recent Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Contributions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-600 text-sm">Date</th>
                  <th className="text-left py-2 text-gray-600 text-sm">Type</th>
                  <th className="text-left py-2 text-gray-600 text-sm">Trees</th>
                  <th className="text-left py-2 text-gray-600 text-sm">Description</th>
                </tr>
              </thead>
              <tbody>
                {recentContributions.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 text-sm">{item.date}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.type === 'Subscription' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-semibold">{item.trees}</td>
                    <td className="py-3 text-sm">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyImpact;