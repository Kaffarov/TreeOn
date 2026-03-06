// src/pages/public/TrainingDetails.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaUsers, 
  FaClock,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const TrainingDetails = () => {
  const { id } = useParams();

  // Mock training data (in real app, fetch based on id)
  const trainings = [
    {
      id: 1,
      title: 'Pruning Techniques for Fruit Trees',
      date: '2026-03-20',
      time: '10:00 - 13:00',
      location: 'Davao City Hall, Philippines',
      trainer: 'Dr. Jane Green',
      description: 'Learn proper pruning methods to maximize fruit production and tree health. Hands‑on demonstration included.',
      capacity: 25,
      registered: 18,
      image: 'https://via.placeholder.com/800x400?text=Pruning+Workshop',
      topics: ['Pruning tools', 'Timing', 'Disease prevention'],
    },
    {
      id: 2,
      title: 'Soil Health Management',
      date: '2026-03-25',
      time: '09:00 - 16:00',
      location: 'Community Center, Nakuru, Kenya',
      trainer: 'John Forester',
      description: 'Comprehensive training on soil testing, composting, and natural fertilizers.',
      capacity: 30,
      registered: 22,
      image: 'https://via.placeholder.com/800x400?text=Soil+Health',
      topics: ['Soil composition', 'Composting', 'Cover crops'],
    },
  ];

  const training = trainings.find(t => t.id === parseInt(id)) || trainings[0];

  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (training.registered >= training.capacity) {
      toast.error('Sorry, this training is full.');
      return;
    }
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistered(true);
      toast.success('Registration successful! You will receive a confirmation email.');
    }, 1500);
  };

  const spotsLeft = training.capacity - training.registered;

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/training" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition">
          <FaArrowLeft className="mr-2" /> Back to Training Programs
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img src={training.image} alt={training.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{training.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Details */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Training Details</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start">
                  <FaCalendarAlt className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Date & Time:</span> {training.date}, {training.time}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Location:</span> {training.location}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUser className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Trainer:</span> {training.trainer}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Capacity:</span> {training.registered}/{training.capacity} registered
                    {spotsLeft > 0 && (
                      <span className="ml-2 text-green-600 text-sm">{spotsLeft} spots left</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{training.description}</p>
              </div>
              {training.topics && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Topics Covered</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {training.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column: Registration */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Register for Training</h2>
              {registered ? (
                <div className="text-center py-6">
                  <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                  <p className="text-gray-700">You are registered for this training.</p>
                  <p className="text-sm text-gray-500 mt-2">Check your email for confirmation.</p>
                </div>
              ) : (
                <>
                  {spotsLeft > 0 ? (
                    <>
                      <p className="text-gray-600 mb-4">
                        {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} remaining.
                      </p>
                      <button
                        onClick={handleRegister}
                        disabled={isRegistering}
                        className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition disabled:opacity-70"
                      >
                        {isRegistering ? 'Registering...' : 'Register Now'}
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-red-600 font-semibold">This training is full.</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingDetails;