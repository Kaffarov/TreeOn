// src/pages/farmer/ReportDeadTree.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTree, FaExclamationTriangle, FaCamera, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ReportDeadTree = () => {
  const navigate = useNavigate();

  // Mock list of farmer's trees (in real app, fetched from API)
  const myTrees = [
    { id: 'T12345', species: 'Oak', location: 'North Field' },
    { id: 'T12346', species: 'Mahogany', location: 'Riverside' },
    { id: 'T12347', species: 'Mangrove', location: 'Wetland' },
    { id: 'T12348', species: 'Pine', location: 'Hilltop' },
  ];

  const [formData, setFormData] = useState({
    treeId: '',
    reason: '',
    otherReason: '',
    notes: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const reasons = [
    'Drought',
    'Disease',
    'Animal damage',
    'Flood',
    'Fire',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'reason' && value === 'Other') {
      setShowOther(true);
    } else if (name === 'reason' && value !== 'Other') {
      setShowOther(false);
    }
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.treeId) newErrors.treeId = 'Please select a tree';
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    if (formData.reason === 'Other' && !formData.otherReason.trim()) {
      newErrors.otherReason = 'Please specify the reason';
    }
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
    // Simulate API call
    setTimeout(() => {
      toast.success('Death report submitted successfully. An admin will verify it soon.');
      setIsSubmitting(false);
      navigate('/farmer/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Report a Dead Tree</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tree selection */}
              <div>
                <label htmlFor="treeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Tree <span className="text-red-500">*</span>
                </label>
                <select
                  id="treeId"
                  name="treeId"
                  value={formData.treeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.treeId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Choose a tree --</option>
                  {myTrees.map(tree => (
                    <option key={tree.id} value={tree.id}>
                      {tree.id} - {tree.species} ({tree.location})
                    </option>
                  ))}
                </select>
                {errors.treeId && <p className="mt-1 text-sm text-red-600">{errors.treeId}</p>}
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for death <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.reason ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Select reason --</option>
                  {reasons.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
              </div>

              {/* Other reason (conditional) */}
              {showOther && (
                <div>
                  <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 mb-1">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherReason"
                    name="otherReason"
                    value={formData.otherReason}
                    onChange={handleChange}
                    placeholder="e.g., Lightning strike"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                      errors.otherReason ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.otherReason && <p className="mt-1 text-sm text-red-600">{errors.otherReason}</p>}
                </div>
              )}

              {/* Notes / Description */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Describe the condition of the tree, any visible signs, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Photo upload (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload photo (optional)
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => document.getElementById('photoInput').click()}
                    className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FaCamera />
                    <span>{formData.image ? formData.image.name : 'Choose file'}</span>
                  </button>
                  <input
                    id="photoInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a clear photo of the dead tree to help with verification.
                </p>
              </div>

              {/* Submit button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition flex items-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle />
                      <span>Submit Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p>
              <strong>Note:</strong> After submitting, an admin will verify the report. If approved, a replacement tree will be arranged.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportDeadTree;