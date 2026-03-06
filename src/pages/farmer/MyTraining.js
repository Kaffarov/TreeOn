// src/pages/farmer/MyTraining.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaCertificate,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const MyTraining = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock training data
  const trainings = [
    {
      id: 1,
      title: 'Pruning Techniques',
      date: '2026-03-15',
      time: '09:00',
      location: 'Davao City Hall',
      trainer: 'Dr. Jane Green',
      status: 'registered', // registered, attended, cancelled
      certificate: null,
    },
    {
      id: 2,
      title: 'Soil Health Management',
      date: '2026-03-20',
      time: '14:00',
      location: 'Community Center',
      trainer: 'John Forester',
      status: 'registered',
      certificate: null,
    },
    {
      id: 3,
      title: 'Pest Control Basics',
      date: '2026-02-10',
      time: '10:00',
      location: 'Training Farm',
      trainer: 'Maria Silva',
      status: 'attended',
      certificate: 'cert-123.pdf',
    },
    {
      id: 4,
      title: 'Water Management',
      date: '2026-01-25',
      time: '13:00',
      location: 'Online',
      trainer: 'Carlos Mendez',
      status: 'attended',
      certificate: 'cert-124.pdf',
    },
    {
      id: 5,
      title: 'Tree Planting Workshop',
      date: '2025-12-05',
      time: '09:30',
      location: 'Green Valley',
      trainer: 'David Kim',
      status: 'cancelled',
      certificate: null,
    },
  ];

  const upcoming = trainings.filter(t => t.status === 'registered');
  const past = trainings.filter(t => t.status === 'attended' || t.status === 'cancelled');

  const handleViewCertificate = (id) => {
    toast.success(`Viewing certificate for training ${id} (mock)`);
  };

  const getStatusBadge = (status) => {
    const colors = {
      registered: 'bg-blue-100 text-blue-800',
      attended: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`${colors[status]} text-xs px-2 py-1 rounded-full font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

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
          <h1 className="text-3xl font-bold text-gray-800">My Training</h1>
          <p className="text-gray-600 mt-2">View your training sessions and certificates.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Trainings</p>
            <p className="text-2xl font-bold text-gray-800">{trainings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Attended</p>
            <p className="text-2xl font-bold text-green-600">{past.filter(t => t.status === 'attended').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Upcoming</p>
            <p className="text-2xl font-bold text-blue-600">{upcoming.length}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'upcoming'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-3 px-4 border-b-2 transition ${
                activeTab === 'past'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Training List */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {activeTab === 'upcoming' && (
            <div>
              {upcoming.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcoming.map((training) => (
                    <div key={training.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{training.title}</h3>
                          <div className="mt-2 space-y-1 text-gray-600">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-primary-500" />
                              {training.date} at {training.time}
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-primary-500" />
                              {training.location}
                            </div>
                            <div className="flex items-center">
                              <FaUser className="mr-2 text-primary-500" />
                              {training.trainer}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(training.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <FaClock className="text-4xl mx-auto mb-2 text-gray-300" />
                  <p>No upcoming training sessions.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div>
              {past.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {past.map((training) => (
                    <div key={training.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{training.title}</h3>
                          <div className="mt-2 space-y-1 text-gray-600">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-primary-500" />
                              {training.date} at {training.time}
                            </div>
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-primary-500" />
                              {training.location}
                            </div>
                            <div className="flex items-center">
                              <FaUser className="mr-2 text-primary-500" />
                              {training.trainer}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(training.status)}
                          {training.certificate && (
                            <button
                              onClick={() => handleViewCertificate(training.id)}
                              className="bg-primary-600 text-white px-3 py-1 rounded-lg hover:bg-primary-700 transition flex items-center space-x-1 text-sm"
                            >
                              <FaCertificate />
                              <span>Certificate</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <FaCheckCircle className="text-4xl mx-auto mb-2 text-gray-300" />
                  <p>No past training sessions.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyTraining;
