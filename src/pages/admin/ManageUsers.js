// src/pages/admin/ManageUsers.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaUserTie, 
  FaUserSecret, 
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBan,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'donor',
    status: 'active',
    phone: '',
    joinedDate: '',
  });

  // Mock stats
  const stats = {
    totalUsers: 8452,
    donors: 5234,
    farmers: 287,
    planters: 42,
    admins: 8,
  };

  // Mock users data
  const users = [
    { id: 'U001', name: 'John Smith', email: 'john.smith@example.com', role: 'donor', status: 'active', joined: '2025-06-15', lastActive: '2026-03-04' },
    { id: 'U002', name: 'Maria Santos', email: 'maria@example.com', role: 'farmer', status: 'active', joined: '2024-03-15', lastActive: '2026-03-04' },
    { id: 'U003', name: 'Emma Wilson', email: 'emma.w@example.com', role: 'donor', status: 'active', joined: '2025-11-20', lastActive: '2026-03-03' },
    { id: 'U004', name: 'John Kamau', email: 'john.k@example.com', role: 'farmer', status: 'active', joined: '2024-05-20', lastActive: '2026-03-03' },
    { id: 'U005', name: 'Peter Mwangi', email: 'peter.m@example.com', role: 'planter', status: 'active', joined: '2025-01-10', lastActive: '2026-03-05' },
    { id: 'U006', name: 'Ana Souza', email: 'ana.s@example.com', role: 'planter', status: 'inactive', joined: '2025-02-18', lastActive: '2026-02-01' },
    { id: 'U007', name: 'David Chen', email: 'david.c@example.com', role: 'donor', status: 'active', joined: '2025-09-05', lastActive: '2026-03-02' },
    { id: 'U008', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'donor', status: 'suspended', joined: '2025-07-22', lastActive: '2026-02-28' },
    { id: 'U009', name: 'Admin User', email: 'admin@treeon.org', role: 'admin', status: 'active', joined: '2024-01-01', lastActive: '2026-03-05' },
    { id: 'U010', name: 'Moderator One', email: 'mod@treeon.org', role: 'admin', status: 'active', joined: '2024-06-01', lastActive: '2026-03-04' },
  ];

  const roleColors = {
    donor: 'bg-blue-100 text-blue-800',
    farmer: 'bg-green-100 text-green-800',
    planter: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
  };

  const getRoleBadge = (role) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      joinedDate: user.joined,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      toast.success(`User ${id} deleted (mock)`);
    }
  };

  const handleSuspend = (id) => {
    toast.success(`User ${id} suspended (mock)`);
  };

  const handleActivate = (id) => {
    toast.success(`User ${id} activated (mock)`);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('User added successfully (mock)');
    setIsAddModalOpen(false);
    setFormData({});
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    toast.success(`User ${selectedUser.id} updated (mock)`);
    setIsEditModalOpen(false);
  };

  const filteredUsers = users.filter(u => 
    (roleFilter === 'all' || u.role === roleFilter) &&
    (statusFilter === 'all' || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     u.id.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
            <p className="text-gray-600 mt-2">View and manage all system users.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add User</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
            <div className="text-sm text-gray-500">Total Users</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.donors}</div>
            <div className="text-sm text-gray-500">Donors</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">{stats.farmers}</div>
            <div className="text-sm text-gray-500">Farmers</div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.planters}</div>
            <div className="text-sm text-gray-500">Planters</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
            <div className="text-sm text-gray-500">Admins</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Roles</option>
              <option value="donor">Donor</option>
              <option value="farmer">Farmer</option>
              <option value="planter">Planter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{user.id}</td>
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4">{user.joined}</td>
                    <td className="px-6 py-4">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleViewDetails(user)} className="text-blue-600 hover:text-blue-800" title="View Details"><FaEye /></button>
                        <button onClick={() => handleEdit(user)} className="text-green-600 hover:text-green-800" title="Edit"><FaEdit /></button>
                        {user.status === 'active' ? (
                          <button onClick={() => handleSuspend(user.id)} className="text-orange-600 hover:text-orange-800" title="Suspend"><FaBan /></button>
                        ) : (
                          <button onClick={() => handleActivate(user.id)} className="text-green-600 hover:text-green-800" title="Activate"><FaCheckCircle /></button>
                        )}
                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan="8" className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New User</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" required value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input type="password" required value={formData.password || ''} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={formData.role || 'donor'} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="donor">Donor</option>
                    <option value="farmer">Farmer</option>
                    <option value="planter">Planter</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status || 'active'} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                  <input type="date" value={formData.joinedDate || ''} onChange={(e) => setFormData({...formData, joinedDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">Add User</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit User: {selectedUser.id}</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password (leave blank to keep)</label>
                  <input type="password" placeholder="New password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="donor">Donor</option>
                    <option value="farmer">Farmer</option>
                    <option value="planter">Planter</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                  <input type="date" value={formData.joinedDate} onChange={(e) => setFormData({...formData, joinedDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition">Update User</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="font-semibold">ID:</span> {selectedUser.id}</div>
              <div><span className="font-semibold">Name:</span> {selectedUser.name}</div>
              <div><span className="font-semibold">Email:</span> {selectedUser.email}</div>
              <div><span className="font-semibold">Role:</span> {getRoleBadge(selectedUser.role)}</div>
              <div><span className="font-semibold">Status:</span> {getStatusBadge(selectedUser.status)}</div>
              <div><span className="font-semibold">Joined:</span> {selectedUser.joined}</div>
              <div><span className="font-semibold">Last Active:</span> {selectedUser.lastActive}</div>
              <div><span className="font-semibold">Phone:</span> {selectedUser.phone || '—'}</div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsDetailsModalOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;