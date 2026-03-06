// src/pages/donor/PaymentMethods.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaTrash, FaStar, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const PaymentMethods = () => {
  const [methods, setMethods] = useState([
    { id: 1, type: 'card', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2026, isDefault: true },
    { id: 2, type: 'card', brand: 'Mastercard', last4: '8888', expMonth: 8, expYear: 2025, isDefault: false },
    { id: 3, type: 'paypal', email: 'john.doe@example.com', isDefault: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expDate: '',
    cvc: '',
    name: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSetDefault = (id) => {
    setMethods(prev =>
      prev.map(m => ({ ...m, isDefault: m.id === id }))
    );
    toast.success('Default payment method updated');
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setMethods(prev => prev.filter(m => m.id !== id));
      toast.success('Payment method removed');
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate adding a new card
    setTimeout(() => {
      const newId = Math.max(...methods.map(m => m.id)) + 1;
      const newMethod = {
        id: newId,
        type: 'card',
        brand: 'Visa', // mock
        last4: newCard.cardNumber.slice(-4),
        expMonth: parseInt(newCard.expDate.split('/')[0]),
        expYear: parseInt('20' + newCard.expDate.split('/')[1]),
        isDefault: methods.length === 0, // first becomes default
      };
      setMethods(prev => [...prev, newMethod]);
      setIsSaving(false);
      setShowAddModal(false);
      setNewCard({ cardNumber: '', expDate: '', cvc: '', name: '' });
      toast.success('Payment method added');
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
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
            <h1 className="text-3xl font-bold text-gray-800">Payment Methods</h1>
            <p className="text-gray-600 mt-2">Manage your saved payment methods.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Method</span>
          </button>
        </motion.div>

        {/* Payment Methods List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {methods.length > 0 ? (
            <div className="space-y-4">
              {methods.map(method => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 flex items-center justify-between ${
                    method.isDefault ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {method.type === 'card' ? (
                      <FaCreditCard className="text-2xl text-primary-600" />
                    ) : (
                      <FaPaypal className="text-2xl text-blue-600" />
                    )}
                    <div>
                      {method.type === 'card' ? (
                        <p className="font-medium text-gray-800">
                          {method.brand} •••• {method.last4}
                        </p>
                      ) : (
                        <p className="font-medium text-gray-800">PayPal ({method.email})</p>
                      )}
                      {method.type === 'card' && (
                        <p className="text-sm text-gray-500">Expires {method.expMonth}/{method.expYear}</p>
                      )}
                    </div>
                    {method.isDefault && (
                      <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <FaStar className="mr-1" /> Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-gray-600 hover:text-primary-600 px-2 py-1 text-sm"
                      >
                        Set as default
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(method.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FaCreditCard className="text-5xl mx-auto mb-4 text-gray-300" />
              <p>No payment methods saved.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add Payment Method</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={newCard.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expDate"
                      value={newCard.expDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={newCard.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCard.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-70"
                  >
                    {isSaving ? 'Adding...' : 'Add Card'}
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

export default PaymentMethods;