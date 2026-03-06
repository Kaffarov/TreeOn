// src/pages/farmer/HarvestRecords.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaWeight, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const HarvestRecords = () => {
  // Mock harvest data
  const [records, setRecords] = useState([
    { id: 1, date: '2026-02-15', treeSpecies: 'Coconut', productType: 'Coconuts', quantity: 150, income: 300, buyer: 'Local Market', notes: 'Good quality' },
    { id: 2, date: '2026-02-10', treeSpecies: 'Banana', productType: 'Bananas', quantity: 200, income: 250, buyer: 'Cooperative', notes: '' },
    { id: 3, date: '2026-01-28', treeSpecies: 'Mango', productType: 'Mangoes', quantity: 80, income: 160, buyer: 'Trader', notes: 'Early harvest' },
    { id: 4, date: '2026-01-15', treeSpecies: 'Avocado', productType: 'Avocados', quantity: 120, income: 360, buyer: 'Exporter', notes: '' },
  ]);

  // Stats
  const totalHarvests = records.length;
  const totalIncome = records.reduce((sum, r) => sum + r.income, 0);
  const totalKg = records.reduce((sum, r) => sum + r.quantity, 0);
  const lastHarvest = records.length > 0 ? records[0].date : 'N/A';

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    treeSpecies: '',
    productType: '',
    quantity: '',
    income: '',
    buyer: '',
    notes: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = () => {
    setEditingRecord(null);
    setFormData({
      date: '',
      treeSpecies: '',
      productType: '',
      quantity: '',
      income: '',
      buyer: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({ ...record });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this harvest record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
      toast.success('Harvest record deleted');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      if (editingRecord) {
        // Update
        setRecords(prev =>
          prev.map(r => (r.id === editingRecord.id ? { ...formData, id: r.id } : r))
        );
        toast.success('Harvest record updated');
      } else {
        // Add new
        const newId = Math.max(...records.map(r => r.id), 0) + 1;
        setRecords(prev => [{ ...formData, id: newId }, ...prev]);
        toast.success('Harvest record added');
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 1000);
  };

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
            <h1 className="text-3xl font-bold text-gray-800">Harvest Records</h1>
            <p className="text-gray-600 mt-2">Track your harvests and income from trees.</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Harvest</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaLeaf className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Harvests</p>
              <p className="text-2xl font-bold text-gray-800">{totalHarvests}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaDollarSign className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-gray-800">${totalIncome}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FaWeight className="text-amber-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Quantity (kg)</p>
              <p className="text-2xl font-bold text-gray-800">{totalKg} kg</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center"
          >
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaCalendarAlt className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Harvest</p>
              <p className="text-2xl font-bold text-gray-800">{lastHarvest}</p>
            </div>
          </motion.div>
        </div>

        {/* Harvest Records Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tree Species</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record, idx) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4">{record.treeSpecies}</td>
                    <td className="px-6 py-4">{record.productType}</td>
                    <td className="px-6 py-4 font-medium">{record.quantity} kg</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${record.income}</td>
                    <td className="px-6 py-4">{record.buyer}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No harvest records found. Add your first harvest!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingRecord ? 'Edit Harvest' : 'Add Harvest'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tree Species *</label>
                  <input
                    type="text"
                    name="treeSpecies"
                    value={formData.treeSpecies}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Coconut"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Type *</label>
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Coconuts"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg) *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Income ($) *</label>
                    <input
                      type="number"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buyer *</label>
                  <input
                    type="text"
                    name="buyer"
                    value={formData.buyer}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Local Market"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    rows="2"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 disabled:opacity-70"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>{editingRecord ? 'Update' : 'Save'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HarvestRecords;