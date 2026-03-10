// src/pages/donor/DonorDashboard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTree, 
  FaLeaf, 
  FaCalendarAlt, 
  FaCreditCard, 
  FaArrowRight,
  FaMapMarkedAlt,
  FaCertificate,
  FaHeart
} from 'react-icons/fa';

const DonorDashboard = () => {
  // Mock donor data (in real app, fetch from context/API)
  const donor = {
    name: 'John Doe',
    totalTrees: 47,
    co2Offset: 1.2, // tons
    subscription: {
      plan: 'Premium',
      nextBilling: '2026-04-01',
      status: 'active',
    },
  };

  // Mock recent trees
  const recentTrees = [
    { id: 'T12345', species: 'Oak', plantedDate: '2026-02-15', location: 'Kenya' },
    { id: 'T12346', species: 'Mahogany', plantedDate: '2026-02-10', location: 'Brazil' },
    { id: 'T12347', species: 'Mangrove', plantedDate: '2026-02-05', location: 'Philippines' },
    { id: 'T12348', species: 'Pine', plantedDate: '2026-01-28', location: 'Ethiopia' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Added top padding to account for fixed header */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {donor.name}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your impact and activity.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className="text-gray-500 text-sm">Trees Planted</p>
              <p className="text-2xl font-bold text-gray-800">{donor.totalTrees}</p>
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
              <p className="text-2xl font-bold text-gray-800">{donor.co2Offset}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaCreditCard className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Plan</p>
              <p className="text-2xl font-bold text-gray-800">{donor.subscription.plan}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FaCalendarAlt className="text-amber-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Next Billing</p>
              <p className="text-2xl font-bold text-gray-800">{donor.subscription.nextBilling}</p>
            </div>
          </motion.div>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Trees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Your Recent Trees</h2>
              <Link to="/dashboard/trees" className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                View All <FaArrowRight className="ml-1" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 text-sm">Tree ID</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Species</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Location</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Planted</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Map</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrees.map((tree) => (
                    <tr key={tree.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm font-mono">{tree.id}</td>
                      <td className="py-3 text-sm">{tree.species}</td>
                      <td className="py-3 text-sm">{tree.location}</td>
                      <td className="py-3 text-sm">{tree.plantedDate}</td>
                      <td className="py-3 text-sm">
                        <Link to={`/dashboard/map?tree=${tree.id}`} className="text-primary-600 hover:text-primary-800">
                          <FaMapMarkedAlt />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right column: Subscription & Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Subscription Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Subscription</h2>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Current Plan</p>
                    <p className="text-2xl font-bold text-primary-600">{donor.subscription.plan}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>Next billing: {donor.subscription.nextBilling}</p>
                </div>
                <Link
                  to="/dashboard/subscription"
                  className="mt-4 inline-block text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Manage Subscription →
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/dashboard/impact" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">View My Impact</span>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                </Link>
                <Link to="/dashboard/certificates" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">My Certificates</span>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                </Link>
                <Link to="/gift" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Gift Trees</span>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                </Link>
                <Link to="/dashboard/settings" className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Account Settings</span>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-primary-600 text-white rounded-xl p-6 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Plant More Trees</h2>
          <p className="mb-4">Your support makes a difference. Plant additional trees today.</p>
          <Link
            to="/donate"
            className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Donate Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDashboard;