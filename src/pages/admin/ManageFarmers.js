// src/pages/admin/ManageFarmers.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserTie, 
  FaMapMarkerAlt, 
  FaTree, 
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSeedling,
  FaGraduationCap,
  FaFileExport,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageFarmers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    region: '',
    landSize: '',
    joinDate: '',
    status: 'active',
    notes: '',
  });

  // Mock data
  const stats = {
    totalFarmers: 287,
    activeFarmers: 245,
    pendingVerification: 23,
    inactive: 19,
    totalTrees: 58420,
    totalHectares: 489,
  };

  const farmers = [
    { id: 'F001', name: 'Maria Santos', email: 'maria@example.com', phone: '+63 912 345 6789', location: 'Davao, Philippines', region: 'Asia', landSize: 3.5, trees: 320, joinDate: '2024-03-15', status: 'active', training: 3, lastActive: '2026-03-04' },
    { id: 'F002', name: 'John Kamau', email: 'john@example.com', phone: '+254 712 345 678', location: 'Nakuru, Kenya', region: 'Africa', landSize: 2.8, trees: 280, joinDate: '2024-05-20', status: 'active', training: 2, lastActive: '2026-03-03' },
    { id: 'F003', name: 'Carlos Rodriguez', email: 'carlos@example.com', phone: '+55 11 91234 5678', location: 'Amazonas, Brazil', region: 'South America', landSize: 5.2, trees: 450, joinDate: '2024-01-10', status: 'active', training: 4, lastActive: '2026-03-05' },
    { id: 'F004', name: 'Dewi Lestari', email: 'dewi@example.com', phone: '+62 812 3456 7890', location: 'Kalimantan, Indonesia', region: 'Asia', landSize: 4.0, trees: 380, joinDate: '2024-07-08', status: 'pending', training: 1, lastActive: '2026-02-28' },
    { id: 'F005', name: 'Tsegaye Abera', email: 'tsegaye@example.com', phone: '+251 911 234 567', location: 'Oromia, Ethiopia', region: 'Africa', landSize: 2.2, trees: 195, joinDate: '2024-09-12', status: 'inactive', training: 0, lastActive: '2026-01-15' },
    { id: 'F006', name: 'Ana Silva', email: 'ana@example.com', phone: '+55 21 98765 4321', location: 'Bahia, Brazil', region: 'South America', landSize: 3.0, trees: 260, joinDate: '2024-11-05', status: 'active', training: 2, lastActive: '2026-03-02' },
  ];

  const regions = ['All', 'Africa', 'Asia', 'South America', 'Europe', 'North America'];

  const handleViewDetails = (farmer) => {
    setSelectedFarmer(farmer);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (farmer) => {
    setSelectedFarmer(farmer);
    setFormData({
      name: farmer.name,
      email: farmer.email,
      phone: farmer.phone,
      location: farmer.location,
      region: farmer.region,
      landSize: farmer.landSize,
      joinDate: farmer.joinDate,
      status: farmer.status,
      notes: '',
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      toast.success(`Farmer ${id} deleted (mock)`);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('Farmer added successfully (mock)');
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', phone: '', location: '', region: '', landSize: '', joinDate: '', status: 'active', notes: '' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    toast.success(`Farmer ${selectedFarmer.id} updated (mock)`);
    setIsEditModalOpen(false);
  };

  const handleExport = () => {
    toast.success('Exporting farmers list (mock)');
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredFarmers = farmers.filter(f => 
    (statusFilter === 'all' || f.status === statusFilter) &&
    (regionFilter === 'all' || f.region.toLowerCase() === regionFilter.toLowerCase()) &&
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Farmers</h1>
            <p className="text-gray-600 mt-2">View and manage all partner farmers.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Farmer</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalFarmers}</div>
            <div className="text-sm text-gray-500">Total Farmers</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.activeFarmers}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingVerification}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            <div className="text-sm text-gray-500">Inactive</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalTrees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Trees</div>
          </div>
          <div className="bg-earth-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-earth-600">{stats.totalHectares} ha</div>
            <div className="text-sm text-gray-500">Hectares</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Regions</option>
              {regions.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button
            onClick={handleExport}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaFileExport />
            <span>Export</span>
          </button>
        </div>

        {/* Farmers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land (ha)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFarmers.map(farmer => (
                  <tr key={farmer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{farmer.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{farmer.name}</div>
                      <div className="text-sm text-gray-500">{farmer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{farmer.location}</div>
                      <div className="text-xs text-gray-500">{farmer.region}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{farmer.trees}</td>
                    <td className="px-6 py-4">{farmer.landSize}</td>
                    <td className="px-6 py-4">{farmer.joinDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(farmer.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(farmer)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(farmer)}
                          className="text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(farmer.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => toast.info('View trees (mock)')}
                          className="text-primary-600 hover:text-primary-800"
                          title="View Trees"
                        >
                          <FaTree />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFarmers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">No farmers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add Farmer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Farmer</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Region</option>
                    {regions.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landSize}
                    onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Add Farmer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Farmer Modal */}
      {isEditModalOpen && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Farmer: {selectedFarmer.id}</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Region</option>
                    {regions.slice(1).map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Land Size (hectares)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landSize}
                    onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Update Farmer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Farmer Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="font-semibold">ID:</span> {selectedFarmer.id}</div>
              <div><span className="font-semibold">Name:</span> {selectedFarmer.name}</div>
              <div><span className="font-semibold">Email:</span> {selectedFarmer.email}</div>
              <div><span className="font-semibold">Phone:</span> {selectedFarmer.phone}</div>
              <div><span className="font-semibold">Location:</span> {selectedFarmer.location}</div>
              <div><span className="font-semibold">Region:</span> {selectedFarmer.region}</div>
              <div><span className="font-semibold">Land Size:</span> {selectedFarmer.landSize} ha</div>
              <div><span className="font-semibold">Trees Planted:</span> {selectedFarmer.trees}</div>
              <div><span className="font-semibold">Join Date:</span> {selectedFarmer.joinDate}</div>
              <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedFarmer.status)}</div>
              <div><span className="font-semibold">Training Sessions:</span> {selectedFarmer.training}</div>
              <div><span className="font-semibold">Last Active:</span> {selectedFarmer.lastActive}</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageFarmers;