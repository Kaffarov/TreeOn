// src/pages/donor/AchievementBadges.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaAward, 
  FaTree, 
  FaLeaf, 
  FaSeedling, 
  FaGlobeAmericas, 
  FaHeart, 
  FaStar,
  FaCalendarAlt,
  FaLock
} from 'react-icons/fa';

const AchievementBadges = () => {
  // Mock badges data
  const badges = [
    { id: 1, name: 'First Tree', description: 'Planted your first tree', icon: FaSeedling, earned: true, date: '2025-06-15' },
    { id: 2, name: 'Green Thumb', description: 'Planted 10 trees', icon: FaLeaf, earned: true, date: '2025-08-20' },
    { id: 3, name: 'Forest Friend', description: 'Planted 50 trees', icon: FaTree, earned: true, date: '2025-11-03' },
    { id: 4, name: 'Eco Warrior', description: 'Planted 100 trees', icon: FaAward, earned: true, date: '2026-01-10' },
    { id: 5, name: 'Global Gardener', description: 'Planted trees in 3 countries', icon: FaGlobeAmericas, earned: false, progress: 2, target: 3 },
    { id: 6, name: 'Generous Heart', description: 'Gifted trees to others', icon: FaHeart, earned: false, progress: 3, target: 5 },
    { id: 7, name: 'Monthly Hero', description: 'Maintained a subscription for 6 months', icon: FaStar, earned: false, progress: 4, target: 6 },
  ];

  // Separate earned and locked
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

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
          <h1 className="text-3xl font-bold text-gray-800">Achievement Badges</h1>
          <p className="text-gray-600 mt-2">Celebrate your impact milestones.</p>
        </motion.div>

        {/* Earned Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Earned Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {earnedBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-primary-100 hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4">
                    <Icon className="text-primary-600 text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{badge.name}</h3>
                  <p className="text-gray-600 text-sm text-center mb-3">{badge.description}</p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    <span>Earned {badge.date}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Locked Badges / In Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Next Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lockedBadges.map((badge, index) => {
              const Icon = badge.icon;
              const progressPercentage = (badge.progress / badge.target) * 100;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 opacity-75 relative"
                >
                  <div className="absolute top-3 right-3">
                    <FaLock className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4">
                    <Icon className="text-gray-500 text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-600 text-center mb-2">{badge.name}</h3>
                  <p className="text-gray-500 text-sm text-center mb-3">{badge.description}</p>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}/{badge.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-primary-50 p-6 rounded-xl text-center"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Keep Going!</h3>
          <p className="text-gray-600">
            The more you plant, the more badges you earn. Share your achievements with friends.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementBadges;