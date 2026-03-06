// src/pages/farmer/FarmerDashboard.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTree, 
  FaLeaf, 
  FaCalendarAlt, 
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowRight,
  FaSeedling,
  FaUserGraduate
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const FarmerDashboard = () => {
  // Mock farmer data (in real app, fetched from API)
  const farmer = {
    name: 'Maria Santos',
    location: 'Davao, Philippines',
    totalTrees: 320,
    landSize: 3.5, // hectares
    trainingSessions: 3,
    joinedDate: '2024-03-15',
  };

  // Mock stats
  const stats = [
    { title: 'Total Trees', value: farmer.totalTrees, icon: FaTree, color: 'bg-green-500' },
    { title: 'Land Size', value: `${farmer.landSize} ha`, icon: FaLeaf, color: 'bg-blue-500' },
    { title: 'Training Sessions', value: farmer.trainingSessions, icon: FaUserGraduate, color: 'bg-purple-500' },
    { title: 'This Year\'s Trees', value: 45, icon: FaSeedling, color: 'bg-amber-500' },
  ];

  // Mock recent trees
  const recentTrees = [
    { id: 'T12345', species: 'Mangrove', plantedDate: '2026-02-28', status: 'healthy' },
    { id: 'T12346', species: 'Mahogany', plantedDate: '2026-02-15', status: 'healthy' },
    { id: 'T12347', species: 'Coconut', plantedDate: '2026-01-20', status: 'healthy' },
    { id: 'T12348', species: 'Banana', plantedDate: '2026-01-10', status: 'needs attention' },
  ];

  // Mock pending actions
  const pendingActions = [
    { id: 1, type: 'Report Dead Tree', count: 0, icon: FaExclamationTriangle, color: 'text-red-500', link: '/farmer/report-death' },
    { id: 2, type: 'Replacement Status', count: 1, icon: FaHourglassHalf, color: 'text-amber-500', link: '/farmer/replacements' },
    { id: 3, type: 'Upcoming Training', count: 2, icon: FaCalendarAlt, color: 'text-green-500', link: '/farmer/training' },
  ];

  // Mock upcoming training
  const upcomingTraining = [
    { id: 'TR001', title: 'Pruning Workshop', date: '2026-03-15', time: '09:00' },
    { id: 'TR002', title: 'Soil Health', date: '2026-03-20', time: '14:00' },
  ];

  const handleReportDeath = () => {
    toast.success('Report death feature (mock)');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {farmer.name}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your farm's impact.</p>
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
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingActions.map((action) => (
              <Link
                key={action.id}
                to={action.link}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition flex items-center space-x-3"
              >
                <action.icon className={`${action.color} text-2xl`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{action.type}</p>
                  <p className="text-xl font-bold text-gray-800">{action.count}</p>
                </div>
                <FaArrowRight className="text-gray-400" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Trees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Trees</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 text-sm">Tree ID</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Species</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Planted</th>
                    <th className="text-left py-2 text-gray-600 text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrees.map((tree) => (
                    <tr key={tree.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm font-mono">{tree.id}</td>
                      <td className="py-3 text-sm">{tree.species}</td>
                      <td className="py-3 text-sm">{tree.plantedDate}</td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tree.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tree.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link to="/farmer/trees" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                View all trees <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.div>

          {/* Upcoming Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Training</h2>
            {upcomingTraining.length > 0 ? (
              <div className="space-y-3">
                {upcomingTraining.map((training) => (
                  <div key={training.id} className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <div className="bg-primary-100 p-2 rounded-lg mr-3">
                      <FaCalendarAlt className="text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{training.title}</p>
                      <p className="text-xs text-gray-500">{training.date} at {training.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming training sessions.</p>
            )}
            <div className="mt-4">
              <Link to="/farmer/training" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                View calendar <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/farmer/report-death"
              className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition flex items-center space-x-2"
            >
              <FaExclamationTriangle />
              <span>Report Dead Tree</span>
            </Link>
            <Link
              to="/farmer/training"
              className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition flex items-center space-x-2"
            >
              <FaCalendarAlt />
              <span>View Training</span>
            </Link>
            <Link
              to="/farmer/harvest"
              className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition flex items-center space-x-2"
            >
              <FaLeaf />
              <span>Record Harvest</span>
            </Link>
            <Link
              to="/farmer/land"
              className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition flex items-center space-x-2"
            >
              <FaSeedling />
              <span>My Land</span>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmerDashboard;