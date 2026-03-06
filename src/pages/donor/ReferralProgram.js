// src/pages/donor/ReferralProgram.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGift, 
  FaShareAlt, 
  FaCopy, 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp,
  FaEnvelope,
  FaTree,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ReferralProgram = () => {
  // Mock referral data
  const referralData = {
    code: 'JOHN123',
    link: 'https://treeon.org/ref/JOHN123',
    totalReferrals: 5,
    treesEarned: 10,
    referrals: [
      { id: 1, name: 'Alice Smith', date: '2026-02-15', treesEarned: 2 },
      { id: 2, name: 'Bob Johnson', date: '2026-02-10', treesEarned: 2 },
      { id: 3, name: 'Carol White', date: '2026-01-28', treesEarned: 2 },
      { id: 4, name: 'David Brown', date: '2026-01-15', treesEarned: 2 },
      { id: 5, name: 'Eve Davis', date: '2026-01-05', treesEarned: 2 },
    ],
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralData.link);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    let shareUrl = '';
    const text = `Join me on TreeOn and help plant trees! Use my referral link: ${referralData.link}`;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.link)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Join%20me%20on%20TreeOn&body=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
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
          <h1 className="text-3xl font-bold text-gray-800">Referral Program</h1>
          <p className="text-gray-600 mt-2">
            Invite friends to join TreeOn and earn extra trees for every referral!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaGift className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-800">{referralData.totalReferrals}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaTree className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trees Earned</p>
              <p className="text-2xl font-bold text-gray-800">{referralData.treesEarned}</p>
            </div>
          </motion.div>
        </div>

        {/* Referral Code & Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referral Link</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              readOnly
              value={referralData.link}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
            <button
              onClick={handleCopy}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
            >
              {copied ? <FaCheckCircle /> : <FaCopy />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Share via:</p>
            <div className="flex space-x-3">
              <button onClick={() => handleShare('facebook')} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                <FaFacebook />
              </button>
              <button onClick={() => handleShare('twitter')} className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500">
                <FaTwitter />
              </button>
              <button onClick={() => handleShare('whatsapp')} className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600">
                <FaWhatsapp />
              </button>
              <button onClick={() => handleShare('email')} className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Referral List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referrals</h2>
          {referralData.referrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Friend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {referralData.referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{ref.name}</td>
                      <td className="px-6 py-4">{ref.date}</td>
                      <td className="px-6 py-4 font-semibold text-primary-600">{ref.treesEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No referrals yet. Share your link to get started!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralProgram;