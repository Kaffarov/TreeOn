// src/pages/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTree, 
  FaUsers, 
  FaHandsHelping, 
  FaCreditCard,
  FaExclamationTriangle,
  FaHourglassHalf,
  FaCheckCircle,
  FaArrowRight,
  FaSeedling,
  FaUserCheck,
  FaMapMarkedAlt,
  FaDollarSign
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
  const [stats, setStats] = useState({
    totalTrees: 58420,
    activeDonors: 5234,
    partnerFarmers: 287,
    activeSubscriptions: 1890,
    totalRevenue: 285000,
    pendingReports: 12,
  });

  // Pending actions
  const pendingActions = [
    { id: 1, type: 'Death Reports', count: 12, icon: FaExclamationTriangle, color: 'text-red-500', link: '/admin/reports' },
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

  // Recent donations (mock)
  const recentDonations = [
    { id: 'DON-001', donor: 'John Smith', amount: 100, date: '2026-03-04' },
    { id: 'DON-002', donor: 'Emma Wilson', amount: 250, date: '2026-03-04' },
    { id: 'DON-003', donor: 'Michael Brown', amount: 50, date: '2026-03-03' },
    { id: 'DON-004', donor: 'Sophia Garcia', amount: 500, date: '2026-03-03' },
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-green-500 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaTree />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Trees</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalTrees.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-blue-500 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaUsers />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Donors</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeDonors.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-amber-500 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaHandsHelping />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Partner Farmers</p>
              <p className="text-2xl font-bold text-gray-800">{stats.partnerFarmers}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-purple-500 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaCreditCard />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeSubscriptions}</p>
            </div>
          </motion.div>
        </div>

        {/* Second row stats (revenue, pending) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-green-600 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaDollarSign />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">€{stats.totalRevenue.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-red-500 w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
              <FaExclamationTriangle />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Reports</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingReports}</p>
            </div>
          </motion.div>
        </div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.3 }}
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

        {/* Recent Trees & Recent Donations */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Trees Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
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

          {/* Recent Donations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Donations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 text-sm">ID</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Donor</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Amount</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((donation) => (
                    <tr key={donation.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm font-mono">{donation.id}</td>
                      <td className="py-3 text-sm">{donation.donor}</td>
                      <td className="py-3 text-sm font-semibold">€{donation.amount}</td>
                      <td className="py-3 text-sm">{donation.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link to="/admin/donations" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                View all donations <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/users" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Manage Users</Link>
            <Link to="/admin/trees" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Manage Trees</Link>
            <Link to="/admin/farmers" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Manage Farmers</Link>
            <Link to="/admin/reports" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Verify Reports</Link>
            <Link to="/admin/training" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Schedule Training</Link>
            <Link to="/admin/reports/generate" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-800 text-sm font-medium">Generate Report</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;