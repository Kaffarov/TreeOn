// src/pages/public/LivePlantingFeed.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaMapMarkerAlt, FaUser, FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';

const LivePlantingFeed = () => {
  // Mock feed data
  const allPosts = [
    { id: 'P001', treeId: 'T12345', species: 'Oak', donor: 'John Smith', isAnonymous: false, planter: 'Peter Mwangi', location: 'Nakuru, Kenya', date: '2026-03-05T10:30:00Z', image: 'https://via.placeholder.com/400x300?text=Oak+Planting' },
    { id: 'P002', treeId: 'T12346', species: 'Mahogany', donor: 'Anonymous', isAnonymous: true, planter: 'Ana Souza', location: 'Amazonas, Brazil', date: '2026-03-05T09:15:00Z', image: 'https://via.placeholder.com/400x300?text=Mahogany+Planting' },
    { id: 'P003', treeId: 'T12347', species: 'Mangrove', donor: 'Emma Wilson', isAnonymous: false, planter: 'Carlos Rodriguez', location: 'Davao, Philippines', date: '2026-03-04T14:20:00Z', image: 'https://via.placeholder.com/400x300?text=Mangrove+Planting' },
    { id: 'P004', treeId: 'T12348', species: 'Pine', donor: 'Michael Brown', isAnonymous: false, planter: 'Tsegaye Abera', location: 'Oromia, Ethiopia', date: '2026-03-04T11:45:00Z', image: 'https://via.placeholder.com/400x300?text=Pine+Planting' },
    { id: 'P005', treeId: 'T12349', species: 'Teak', donor: 'Sophia Garcia', isAnonymous: false, planter: 'Dewi Lestari', location: 'Kalimantan, Indonesia', date: '2026-03-03T16:00:00Z', image: 'https://via.placeholder.com/400x300?text=Teak+Planting' },
    { id: 'P006', treeId: 'T12350', species: 'Oak', donor: 'Anonymous', isAnonymous: true, planter: 'John Kamau', location: 'California, USA', date: '2026-03-03T08:30:00Z', image: 'https://via.placeholder.com/400x300?text=Oak+Planting' },
    { id: 'P007', treeId: 'T12351', species: 'Cedar', donor: 'David Chen', isAnonymous: false, planter: 'Maria Santos', location: 'Beirut, Lebanon', date: '2026-03-02T13:10:00Z', image: 'https://via.placeholder.com/400x300?text=Cedar+Planting' },
    { id: 'P008', treeId: 'T12352', species: 'Mangrove', donor: 'Maria Santos', isAnonymous: false, planter: 'Carlos Mendez', location: 'Cebu, Philippines', date: '2026-03-02T09:50:00Z', image: 'https://via.placeholder.com/400x300?text=Mangrove+Planting' },
    { id: 'P009', treeId: 'T12353', species: 'Acacia', donor: 'John Kamau', isAnonymous: false, planter: 'Peter Mwangi', location: 'Nairobi, Kenya', date: '2026-03-01T15:20:00Z', image: 'https://via.placeholder.com/400x300?text=Acacia+Planting' },
    { id: 'P010', treeId: 'T12354', species: 'Pine', donor: 'Carlos Mendez', isAnonymous: false, planter: 'Ana Souza', location: 'Madrid, Spain', date: '2026-02-28T12:00:00Z', image: 'https://via.placeholder.com/400x300?text=Pine+Planting' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(allPosts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const speciesList = ['all', ...new Set(allPosts.map(p => p.species))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.donor.toLowerCase().includes(searchTerm.toLowerCase()) && !post.isAnonymous);
    const matchesSpecies = speciesFilter === 'all' || post.species === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs === 1 ? '' : 's'} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  };

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
            Live Planting Feed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Watch as trees are planted around the world – in near real time.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by species, location, or donor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              {speciesList.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filteredPosts.length} recent plantings</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.02 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
                  >
                    <div className="relative h-48">
                      <img src={post.image} alt={post.species} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{post.species}</h3>
                        <span className="text-xs text-gray-500">Tree {post.treeId}</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-primary-500" />
                          {post.location}
                        </p>
                        <p className="flex items-center">
                          <FaUser className="mr-2 text-primary-500" />
                          Donor: {post.isAnonymous ? 'Anonymous' : post.donor}
                        </p>
                        <p className="flex items-center">
                          <FaTree className="mr-2 text-primary-500" />
                          Planter: {post.planter}
                        </p>
                        <p className="flex items-center">
                          <FaCalendarAlt className="mr-2 text-primary-500" />
                          {formatDate(post.date)}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/tree/${post.treeId}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View on Map →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center text-gray-500 py-12">No plantings match your search.</div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default LivePlantingFeed;