// src/pages/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaUsers, 
  FaHandsHelping, 
  FaCreditCard,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowRight,
  FaSeedling,
  FaUserCheck,
  FaMapMarkedAlt
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data for stats
  const stats = [
    { title: 'Total Trees', value: 58420, icon: FaTree, color: 'bg-green-500', change: '+12.3%' },
    { title: 'Active Donors', value: 5234, icon: FaUsers, color: 'bg-blue-500', change: '+8.1%' },
    { title: 'Partner Farmers', value: 287, icon: FaHandsHelping, color: 'bg-amber-500', change: '+5.4%' },
    { title: 'Active Subscriptions', value: 1890, icon: FaCreditCard, color: 'bg-purple-500', change: '+15.2%' },
  ];

  // Pending actions
  const pendingActions = [
    { id: 1, type: 'Death Report', count: 12, icon: FaExclamationTriangle, color: 'text-red-500', link: '/admin/reports' },
    { id: 2, type: 'Replacements', count: 8, icon: FaHourglassHalf, color: 'text-amber-500', link: '/admin/reports' },
    { id: 3, type: 'New Farmers', count: 5, icon: FaUserCheck, color: 'text-green-500', link: '/admin/farmers' },
    { id: 4, type: 'Pending Geotags', count: 23, icon: FaMapMarkedAlt, color: 'text-blue-500', link: '/admin/trees' },
  ];

  // Chart data: trees planted per month
  const monthlyData = [
    { name: 'Jan', trees: 420 },
    { name: 'Feb', trees: 580 },
    { name: 'Mar', trees: 690 },
    { name: 'Apr', trees: 810 },
    { name: 'May', trees: 940 },
    { name: 'Jun', trees: 1120 },
    { name: 'Jul', trees: 1350 },
    { name: 'Aug', trees: 1480 },
    { name: 'Sep', trees: 1620 },
    { name: 'Oct', trees: 1790 },
    { name: 'Nov', trees: 1930 },
    { name: 'Dec', trees: 2100 },
  ];

  // Subscription plan distribution
  const subscriptionData = [
    { name: 'Basic', value: 850, color: '#2e8b57' },
    { name: 'Standard', value: 620, color: '#f39c12' },
    { name: 'Premium', value: 420, color: '#9b59b6' },
  ];

  // Recent trees planted (mock)
  const recentTrees = [
    { id: 'T12345', species: 'Oak', location: 'Kenya', date: '2026-03-04', planter: 'John M.' },
    { id: 'T12346', species: 'Mahogany', location: 'Brazil', date: '2026-03-04', planter: 'Ana S.' },
    { id: 'T12347', species: 'Mangrove', location: 'Philippines', date: '2026-03-03', planter: 'Carlos R.' },
    { id: 'T12348', species: 'Teak', location: 'Indonesia', date: '2026-03-03', planter: 'Dewi L.' },
    { id: 'T12349', species: 'Pine', location: 'Ethiopia', date: '2026-03-02', planter: 'Tsegaye A.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with TreeOn today.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center"
            >
              <div className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                <stat.icon />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-green-600">{stat.change} vs last month</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pendingActions.map((action) => (
              <Link
                key={action.id}
                to={action.link}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition flex flex-col items-center text-center"
              >
                <action.icon className={`${action.color} text-3xl mb-2`} />
                <span className="text-2xl font-bold text-gray-800">{action.count}</span>
                <span className="text-sm text-gray-600">{action.type}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trees Planted Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Trees Planted (Monthly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trees" stroke="#2e8b57" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Subscription Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Subscription Plans</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Trees & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Trees Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Planted Trees</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 text-sm">Tree ID</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Species</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Location</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Date</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Planter</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrees.map((tree) => (
                    <tr key={tree.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm font-mono">{tree.id}</td>
                      <td className="py-3 text-sm">{tree.species}</td>
                      <td className="py-3 text-sm">{tree.location}</td>
                      <td className="py-3 text-sm">{tree.date}</td>
                      <td className="py-3 text-sm">{tree.planter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link to="/admin/trees" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                View all trees <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/users" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Manage Users</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
              <Link to="/admin/trees" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Manage Trees</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
              <Link to="/admin/farmers" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Manage Farmers</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
              <Link to="/admin/reports" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Verify Reports</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
              <Link to="/admin/training" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Schedule Training</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
              <Link to="/admin/reports/generate" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Generate Report</span>
                  <FaArrowRight className="text-gray-400" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;