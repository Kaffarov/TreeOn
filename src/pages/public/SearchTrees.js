// src/pages/public/SearchTrees.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaTree, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const SearchTrees = () => {
  // Mock tree data (same as InteractiveMap but with more fields)
  const allTrees = [
    { id: 'T12345', species: 'Oak', donor: 'John Smith', isAnonymous: false, location: 'Nakuru, Kenya', plantedDate: '2026-02-15', status: 'alive', lat: -1.2921, lng: 36.8219 },
    { id: 'T12346', species: 'Mahogany', donor: 'Emma Wilson', isAnonymous: false, location: 'Amazonas, Brazil', plantedDate: '2026-02-10', status: 'alive', lat: -3.4653, lng: -62.2159 },
    { id: 'T12347', species: 'Mangrove', donor: 'Anonymous', isAnonymous: true, location: 'Davao, Philippines', plantedDate: '2026-02-05', status: 'alive', lat: 7.1907, lng: 125.4553 },
    { id: 'T12348', species: 'Pine', donor: 'Michael Brown', isAnonymous: false, location: 'Oromia, Ethiopia', plantedDate: '2026-01-28', status: 'alive', lat: 7.5399, lng: 39.2399 },
    { id: 'T12349', species: 'Teak', donor: 'Sophia Garcia', isAnonymous: false, location: 'Kalimantan, Indonesia', plantedDate: '2026-01-15', status: 'alive', lat: -1.2921, lng: 116.8219 },
    { id: 'T12350', species: 'Oak', donor: 'Anonymous', isAnonymous: true, location: 'California, USA', plantedDate: '2025-12-10', status: 'dead', lat: 38.5, lng: -121.5 },
    { id: 'T12351', species: 'Cedar', donor: 'David Chen', isAnonymous: false, location: 'Beirut, Lebanon', plantedDate: '2026-03-01', status: 'alive', lat: 33.5, lng: 35.5 },
    { id: 'T12352', species: 'Mangrove', donor: 'Maria Santos', isAnonymous: false, location: 'Cebu, Philippines', plantedDate: '2026-02-20', status: 'alive', lat: 10.3, lng: 123.9 },
    { id: 'T12353', species: 'Acacia', donor: 'John Kamau', isAnonymous: false, location: 'Nairobi, Kenya', plantedDate: '2026-02-18', status: 'alive', lat: -1.3, lng: 36.7 },
    { id: 'T12354', species: 'Pine', donor: 'Carlos Mendez', isAnonymous: false, location: 'Madrid, Spain', plantedDate: '2026-02-14', status: 'alive', lat: 40.5, lng: -3.5 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique species for dropdown
  const speciesList = ['', ...new Set(allTrees.map(t => t.species))];
  const statusList = ['', 'alive', 'dead'];

  const filteredTrees = allTrees.filter(tree => {
    const matchesSearch = tree.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tree.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tree.donor.toLowerCase().includes(searchTerm.toLowerCase()) && !tree.isAnonymous);
    const matchesSpecies = speciesFilter === '' || tree.species === speciesFilter;
    const matchesStatus = statusFilter === '' || tree.status === statusFilter;
    const matchesLocation = locationFilter === '' || tree.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesSpecies && matchesStatus && matchesLocation;
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
            Search Trees
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Find trees by species, location, donor, or ID.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, species, location, donor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center space-x-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                  <select
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Species</option>
                    {speciesList.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Kenya"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-4 pb-16">
        <p className="text-sm text-gray-500 mb-4">{filteredTrees.length} trees found</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrees.map((tree, idx) => (
            <motion.div
              key={tree.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tree.species}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tree.status === 'alive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tree.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-primary-500" />
                  {tree.location}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-500" />
                  {tree.plantedDate}
                </p>
                <p className="flex items-center">
                  <FaUser className="mr-2 text-primary-500" />
                  {tree.isAnonymous ? 'Anonymous' : tree.donor}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">ID: {tree.id}</span>
                <Link
                  to={`/tree/${tree.id}`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredTrees.length === 0 && (
          <div className="text-center text-gray-500 py-12">No trees match your search.</div>
        )}
      </section>
    </div>
  );
};

export default SearchTrees;