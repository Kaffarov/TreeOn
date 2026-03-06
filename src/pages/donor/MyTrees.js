import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTree, FaSearch, FaFilter, FaEye, FaMapMarkerAlt } from 'react-icons/fa';

const MyTrees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock tree data for the donor
  const trees = [
    { id: 'T12345', species: 'Oak', location: 'Nakuru, Kenya', plantedDate: '2026-02-15', status: 'alive', health: 'healthy' },
    { id: 'T12346', species: 'Mahogany', location: 'Amazonas, Brazil', plantedDate: '2026-02-10', status: 'alive', health: 'healthy' },
    { id: 'T12347', species: 'Mangrove', location: 'Davao, Philippines', plantedDate: '2026-02-05', status: 'alive', health: 'healthy' },
    { id: 'T12348', species: 'Pine', location: 'Oromia, Ethiopia', plantedDate: '2026-01-28', status: 'alive', health: 'good' },
    { id: 'T12349', species: 'Teak', location: 'Kalimantan, Indonesia', plantedDate: '2026-01-15', status: 'alive', health: 'healthy' },
    { id: 'T12350', species: 'Oak', location: 'California, USA', plantedDate: '2025-12-10', status: 'dead', health: 'dead' },
  ];

  const statuses = ['all', 'alive', 'dead'];

  const filteredTrees = trees.filter(tree => {
    const matchesSearch = tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tree.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tree.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tree.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return status === 'alive' 
      ? <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Alive</span>
      : <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Dead</span>;
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
          <h1 className="text-3xl font-bold text-gray-800">My Trees</h1>
          <p className="text-gray-600 mt-2">View all trees you have planted.</p>
        </motion.div>

        {/* Search and filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by species, location, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Trees table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tree ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTrees.map((tree, idx) => (
                  <tr key={tree.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{tree.id}</td>
                    <td className="px-6 py-4">{tree.species}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-primary-500 mr-1 text-xs" />
                        {tree.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">{tree.plantedDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(tree.status)}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/dashboard/tree/${tree.id}`}
                        className="text-primary-600 hover:text-primary-800 flex items-center"
                      >
                        <FaEye className="mr-1" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredTrees.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No trees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyTrees;