// src/pages/farmer/FarmerProfile.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTree, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const FarmerProfile = () => {
  // Mock farmer data (in real app, fetch from context/API)
  const [farmer, setFarmer] = useState({
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+63 912 345 6789',
    location: 'Davao, Philippines',
    landSize: 3.5, // hectares
    joinDate: '2024-03-15',
    treesPlanted: 320,
    trainingsAttended: 3,
    bio: 'Passionate farmer dedicated to restoring our environment while improving my community’s livelihood.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedFarmer, setEditedFarmer] = useState({ ...farmer });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFarmer(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedFarmer({ ...farmer });
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setFarmer({ ...editedFarmer });
      setIsEditing(false);
      setIsSaving(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">Farmer Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition flex items-center space-x-2"
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column: Profile form */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaUser className="mr-2 text-primary-500" /> Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedFarmer.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{farmer.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedFarmer.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2 flex items-center">
                        <FaEnvelope className="mr-2 text-gray-400" /> {farmer.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedFarmer.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2 flex items-center">
                        <FaPhone className="mr-2 text-gray-400" /> {farmer.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editedFarmer.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" /> {farmer.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (hectares)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="landSize"
                        value={editedFarmer.landSize}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-800 py-2">{farmer.landSize} ha</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        rows="4"
                        value={editedFarmer.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{farmer.bio}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right column: Stats & Additional info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center"><FaTree className="mr-2 text-primary-500" /> Trees Planted</span>
                    <span className="font-bold text-xl text-primary-600">{farmer.treesPlanted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center"><FaCalendarAlt className="mr-2 text-primary-500" /> Joined</span>
                    <span className="font-bold text-gray-800">{farmer.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center"><FaUser className="mr-2 text-primary-500" /> Trainings Attended</span>
                    <span className="font-bold text-gray-800">{farmer.trainingsAttended}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary-50 rounded-xl p-6"
              >
                <h3 className="font-bold text-gray-800 mb-2">Need help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  If you need to update any information that's not editable here, please contact our support team.
                </p>
                <a href="/contact" className="text-primary-600 hover:underline text-sm font-medium">
                  Contact Support →
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerProfile;