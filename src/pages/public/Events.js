// src/pages/public/Events.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaSearch } from 'react-icons/fa';

const Events = () => {
  // Mock events data
  const allEvents = [
    {
      id: 1,
      title: 'Community Tree Planting Day',
      date: '2026-03-15',
      time: '09:00 - 15:00',
      location: 'Nakuru, Kenya',
      description: 'Join us for a day of planting trees in the Mau Forest. Tools and seedlings provided.',
      capacity: 50,
      registered: 32,
      image: 'https://via.placeholder.com/400x200?text=Tree+Planting+Day',
    },
    {
      id: 2,
      title: 'Farmer Training: Pruning Workshop',
      date: '2026-03-20',
      time: '10:00 - 13:00',
      location: 'Davao, Philippines',
      description: 'Learn proper pruning techniques for fruit trees. Hands‑on workshop.',
      capacity: 25,
      registered: 18,
      image: 'https://via.placeholder.com/400x200?text=Pruning+Workshop',
    },
    {
      id: 3,
      title: 'Reforestation Webinar',
      date: '2026-03-25',
      time: '16:00 - 17:30',
      location: 'Online',
      description: 'Join our experts to discuss the latest reforestation techniques and impact.',
      capacity: 100,
      registered: 45,
      image: 'https://via.placeholder.com/400x200?text=Webinar',
    },
    {
      id: 4,
      title: 'Mangrove Planting in Kalimantan',
      date: '2026-04-02',
      time: '08:00 - 14:00',
      location: 'Kalimantan, Indonesia',
      description: 'Help restore coastal mangroves. Boat transportation and lunch provided.',
      capacity: 30,
      registered: 12,
      image: 'https://via.placeholder.com/400x200?text=Mangrove+Planting',
    },
    {
      id: 5,
      title: 'Agroforestry Workshop',
      date: '2026-04-10',
      time: '09:30 - 16:00',
      location: 'São Paulo, Brazil',
      description: 'Integrating trees with crops and livestock. Practical training.',
      capacity: 20,
      registered: 9,
      image: 'https://via.placeholder.com/400x200?text=Agroforestry',
    },
    {
      id: 6,
      title: 'Fundraising Gala',
      date: '2026-04-15',
      time: '19:00 - 22:00',
      location: 'Berlin, Germany',
      description: 'Evening of inspiration, networking, and support for global reforestation.',
      capacity: 80,
      registered: 53,
      image: 'https://via.placeholder.com/400x200?text=Gala',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'online', 'in-person'

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ? true :
                          filter === 'online' ? event.location === 'Online' :
                          filter === 'in-person' ? event.location !== 'Online' : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Join us for tree plantings, workshops, and community gatherings.
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
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('in-person')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'in-person' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              In‑Person
            </button>
            <button
              onClick={() => setFilter('online')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'online' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Online
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 pb-16">
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-primary-500" />
                      {event.date} | {event.time}
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-primary-500" />
                      {event.registered} / {event.capacity} registered
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <Link
                    to={`/events/${event.id}`}
                    className="inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>No events match your search.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;