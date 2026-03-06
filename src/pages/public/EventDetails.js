// src/pages/public/EventDetails.js
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

const EventDetails = () => {
  const { id } = useParams();

  // Mock events data (in real app, fetch based on id)
  const events = [
    {
      id: 1,
      title: 'Community Tree Planting Day',
      date: '2026-03-15',
      time: '09:00 - 15:00',
      location: 'Nakuru, Kenya',
      organizer: 'TreeOn Kenya',
      description: 'Join us for a day of planting trees in the Mau Forest. We will provide tools, seedlings, and lunch. All ages welcome!',
      capacity: 50,
      registered: 32,
      image: 'https://via.placeholder.com/800x400?text=Tree+Planting+Day',
      mapUrl: 'https://via.placeholder.com/600x300?text=Map+Location',
    },
    {
      id: 2,
      title: 'Farmer Training: Pruning Workshop',
      date: '2026-03-20',
      time: '10:00 - 13:00',
      location: 'Davao, Philippines',
      organizer: 'TreeOn Philippines',
      description: 'Learn proper pruning techniques for fruit trees. This hands-on workshop will cover tools, timing, and best practices.',
      capacity: 25,
      registered: 18,
      image: 'https://via.placeholder.com/800x400?text=Pruning+Workshop',
      mapUrl: 'https://via.placeholder.com/600x300?text=Map+Location',
    },
  ];

  const event = events.find(e => e.id === parseInt(id)) || events[0]; // fallback

  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (event.registered >= event.capacity) {
      toast.error('Sorry, this event is full.');
      return;
    }
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      setRegistered(true);
      toast.success('Registration successful! You will receive a confirmation email.');
    }, 1500);
  };

  const spotsLeft = event.capacity - event.registered;

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/events" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition">
          <FaArrowLeft className="mr-2" /> Back to Events
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start">
                  <FaCalendarAlt className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Date:</span> {event.date}
                    <br />
                    <span className="font-medium">Time:</span> {event.time}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Location:</span> {event.location}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUser className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Organizer:</span> {event.organizer}
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="mr-3 mt-1 text-primary-500" />
                  <div>
                    <span className="font-medium">Capacity:</span> {event.registered}/{event.capacity} registered
                    {spotsLeft > 0 && (
                      <span className="ml-2 text-green-600 text-sm">{spotsLeft} spots left</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
              <img src={event.mapUrl} alt="Map" className="w-full h-48 object-cover rounded-lg" />
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
              {registered ? (
                <div className="text-center py-6">
                  <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                  <p className="text-gray-700">You are registered for this event.</p>
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
                      <p className="text-red-600 font-semibold">This event is full.</p>
                      <p className="text-gray-500 text-sm mt-2">Check back later for cancellations.</p>
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

export default EventDetails;