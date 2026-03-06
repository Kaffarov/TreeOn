// src/pages/donor/PrivacySettings.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserSecret, FaEnvelope, FaShareAlt, FaSave, FaDownload } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PrivacySettings = () => {
  // Mock current privacy settings
  const [settings, setSettings] = useState({
    isAnonymous: false,
    allowEmails: true,
    allowImpactSharing: true,
    allowDataForResearch: false,
    showInLeaderboard: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Privacy settings updated');
    }, 1000);
  };

  const handleExportData = () => {
    toast.success('Data export requested. You will receive an email shortly (mock).');
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
          <h1 className="text-3xl font-bold text-gray-800">Privacy Settings</h1>
          <p className="text-gray-600 mt-2">Control how your data is used and shared.</p>
        </motion.div>

        {/* Privacy Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="space-y-6">
            {/* Anonymity */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isAnonymous"
                  type="checkbox"
                  checked={settings.isAnonymous}
                  onChange={() => handleToggle('isAnonymous')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isAnonymous" className="font-medium text-gray-700 flex items-center">
                  <FaUserSecret className="mr-2 text-primary-500" />
                  Remain anonymous
                </label>
                <p className="text-gray-500">
                  When enabled, your name will be hidden from the public tree registry. Your trees will be listed as "Anonymous".
                </p>
              </div>
            </div>

            {/* Email communications */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="allowEmails"
                  type="checkbox"
                  checked={settings.allowEmails}
                  onChange={() => handleToggle('allowEmails')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="allowEmails" className="font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2 text-primary-500" />
                  Receive email updates
                </label>
                <p className="text-gray-500">
                  Receive newsletters, impact reports, and occasional updates about TreeOn.
                </p>
              </div>
            </div>

            {/* Share impact */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="allowImpactSharing"
                  type="checkbox"
                  checked={settings.allowImpactSharing}
                  onChange={() => handleToggle('allowImpactSharing')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="allowImpactSharing" className="font-medium text-gray-700 flex items-center">
                  <FaShareAlt className="mr-2 text-primary-500" />
                  Share my impact on leaderboards
                </label>
                <p className="text-gray-500">
                  Allow your name and impact to appear on public leaderboards and community pages.
                </p>
              </div>
            </div>

            {/* Data for research */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="allowDataForResearch"
                  type="checkbox"
                  checked={settings.allowDataForResearch}
                  onChange={() => handleToggle('allowDataForResearch')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="allowDataForResearch" className="font-medium text-gray-700">
                  Share anonymized data for research
                </label>
                <p className="text-gray-500">
                  Allow TreeOn to share anonymized data with partner research institutions to study reforestation impact.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Export */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Data</h2>
          <p className="text-gray-600 mb-4">
            You can request a copy of all your personal data stored by TreeOn.
          </p>
          <button
            onClick={handleExportData}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaDownload />
            <span>Request Data Export</span>
          </button>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 disabled:opacity-70 text-lg"
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
                <span>Save Privacy Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;