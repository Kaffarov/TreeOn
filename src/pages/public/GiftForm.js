// src/pages/public/GiftForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGift, FaUser, FaEnvelope, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const GiftForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    message: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
    if (!formData.recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.recipientEmail)) {
      newErrors.recipientEmail = 'Email is invalid';
    }
    if (!formData.senderName.trim()) newErrors.senderName = 'Your name is required';
    if (!formData.message.trim()) newErrors.message = 'Please add a personal message';
    // deliveryDate is optional, no validation needed
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate saving / preparing gift
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you might pass gift details to checkout via state or query params
      // For now, we just navigate to checkout with some mock params
      toast.success('Gift details saved! Proceeding to checkout.');
      navigate('/checkout?gift=true&trees=5&amount=25'); // example
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <FaGift className="text-5xl text-primary-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Gift Trees</h1>
            <p className="text-gray-600">
              Send the gift of a greener planet. Fill in the details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient Name */}
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient's Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="e.g., Maria Santos"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.recipientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.recipientName && <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>}
            </div>

            {/* Recipient Email */}
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient's Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="recipientEmail"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  placeholder="recipient@example.com"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.recipientEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.recipientEmail && <p className="mt-1 text-sm text-red-600">{errors.recipientEmail}</p>}
            </div>

            {/* Sender Name */}
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.senderName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.senderName && <p className="mt-1 text-sm text-red-600">{errors.senderName}</p>}
            </div>

            {/* Personal Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Personal Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write a heartfelt message..."
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            {/* Delivery Date (optional) */}
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Date (optional)
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                If left blank, the gift certificate will be sent immediately.
              </p>
            </div>

            {/* Preview */}
            {formData.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary-50 p-4 rounded-lg border border-primary-200"
              >
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FaHeart className="text-primary-500 mr-2" /> Your Message Preview
                </h3>
                <p className="text-gray-700 mt-2 italic">"{formData.message}"</p>
                <p className="text-sm text-gray-500 mt-2">
                  – {formData.senderName || 'Your name'} to {formData.recipientName || 'Recipient'}
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaGift />
                  <span>Continue to Checkout</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GiftForm;