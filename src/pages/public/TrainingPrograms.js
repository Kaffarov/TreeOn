// src/pages/public/TrainingPrograms.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaUsers,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

const TrainingPrograms = () => {
  // Mock training data
  const allTrainings = [
    {
      id: 1,
      title: 'Pruning Techniques for Fruit Trees',
      date: '2026-03-20',
      time: '10:00 - 13:00',
      location: 'Davao, Philippines',
      trainer: 'Dr. Jane Green',
      capacity: 25,
      registered: 18,
      description: 'Learn proper pruning methods to maximize fruit production.',
      type: 'Workshop',
      image: 'https://via.placeholder.com/400x200?text=Pruning',
    },
    {
      id: 2,
      title: 'Soil Health Management',
      date: '2026-03-25',
      time: '09:00 - 16:00',
      location: 'Nakuru, Kenya',
      trainer: 'John Forester',
      capacity: 30,
      registered: 22,
      description: 'Soil testing, composting, and natural fertilizers.',
      type: 'Course',
      image: 'https://via.placeholder.com/400x200?text=Soil',
    },
    {
      id: 3,
      title: 'Agroforestry Fundamentals',
      date: '2026-03-28',
      time: '09:30 - 15:30',
      location: 'Manaus, Brazil',
      trainer: 'Maria Silva',
      capacity: 20,
      registered: 12,
      description: 'Integrating trees with crops and livestock.',
      type: 'Workshop',
      image: 'https://via.placeholder.com/400x200?text=Agroforestry',
    },
    {
      id: 4,
      title: 'Pest and Disease Management',
      date: '2026-04-02',
      time: '10:00 - 14:00',
      location: 'Online',
      trainer: 'Carlos Mendez',
      capacity: 50,
      registered: 31,
      description: 'Identify and manage common tree pests and diseases.',
      type: 'Webinar',
      image: 'https://via.placeholder.com/400x200?text=Pest',
    },
    {
      id: 5,
      title: 'Water Conservation in Tree Farming',
      date: '2026-04-05',
      time: '09:00 - 12:00',
      location: 'Nairobi, Kenya',
      trainer: 'David Kim',
      capacity: 25,
      registered: 9,
      description: 'Techniques for efficient water use in nurseries and fields.',
      type: 'Workshop',
      image: 'https://via.placeholder.com/400x200?text=Water',
    },
    {
      id: 6,
      title: 'Carbon Sequestration Basics',
      date: '2026-04-10',
      time: '15:00 - 17:00',
      location: 'Online',
      trainer: 'Dr. Jane Green',
      capacity: 100,
      registered: 47,
      description: 'How trees capture carbon and why it matters.',
      type: 'Webinar',
      image: 'https://via.placeholder.com/400x200?text=Carbon',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'workshop', 'course', 'webinar'

  const types = ['all', 'workshop', 'course', 'webinar'];

  const filteredTrainings = allTrainings.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Training Programs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Empower yourself with knowledge – join our training sessions for farmers and tree enthusiasts.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search trainings by title, location, or trainer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              {types.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Trainings Grid */}
      <section className="container mx-auto px-4 pb-16">
        {filteredTrainings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings.map((training, idx) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
              >
                <img src={training.image} alt={training.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{training.title}</h3>
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {training.type}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-primary-500" />
                      {training.date} | {training.time}
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary-500" />
                      {training.location}
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-primary-500" />
                      {training.trainer}
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-primary-500" />
                      {training.registered} / {training.capacity} registered
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{training.description}</p>
                  <Link
                    to={`/training/${training.id}`}
                    className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">No training programs match your search.</div>
        )}
      </section>
    </div>
  );
};

export default TrainingPrograms;