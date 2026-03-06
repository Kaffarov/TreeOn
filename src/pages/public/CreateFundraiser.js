// src/pages/public/CreateFundraiser.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCamera, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaInfoCircle,
  FaGlobe,
  FaHeart,
  FaSave
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CreateFundraiser = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    goal: '',
    description: '',
    story: '',
    endDate: '',
    category: 'trees',
    image: null,
    isPublic: true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    // Clear field error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Campaign title is required';
    if (!formData.goal) newErrors.goal = 'Goal amount is required';
    else if (isNaN(formData.goal) || parseFloat(formData.goal) <= 0) newErrors.goal = 'Goal must be a positive number';
    if (!formData.description.trim()) newErrors.description = 'Short description is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    else if (new Date(formData.endDate) <= new Date()) newErrors.endDate = 'End date must be in the future';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.story.trim()) newErrors.story = 'Your story is required';
    return newErrors;
  };

  const handleNext = () => {
    if (step === 1) {
      const stepErrors = validateStep1();
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        toast.error('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const stepErrors = validateStep2();
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        toast.error('Please tell your story');
        return;
      }
      setStep(3);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Fundraiser created successfully!');
      setIsSubmitting(false);
      navigate('/campaigns');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Create a Fundraiser</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    step >= i
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > i ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Basics</span>
            <span>Your Story</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-lg p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">Campaign Basics</h2>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Help Us Plant 1000 Trees in Kenya"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fundraising Goal (€) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    min="1"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                      errors.goal ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.goal && <p className="mt-1 text-sm text-red-600">{errors.goal}</p>}
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Summarize your campaign in 1-2 sentences"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign End Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                      errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="trees">Tree Planting</option>
                  <option value="forest">Forest Restoration</option>
                  <option value="farmers">Support Farmers</option>
                  <option value="education">Education</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => document.getElementById('imageInput').click()}
                    className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <FaCamera />
                    <span>{formData.image ? formData.image.name : 'Upload Image'}</span>
                  </button>
                  <input
                    id="imageInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Public/Private */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublic"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  Make this campaign public (visible on our site)
                </label>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-lg p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">Your Story</h2>
              <p className="text-gray-600 text-sm">
                Share why you're raising funds and how the donations will be used. This helps donors connect with your cause.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Story <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="story"
                  rows="10"
                  value={formData.story}
                  onChange={handleChange}
                  placeholder="Tell your story in detail..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    errors.story ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.story && <p className="mt-1 text-sm text-red-600">{errors.story}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-lg p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800">Review Your Campaign</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium text-gray-800">{formData.title || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Goal</p>
                  <p className="font-medium text-gray-800">€{formData.goal || '0'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{formData.description || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="text-gray-700">{formData.endDate || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-700">{formData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visibility</p>
                  <p className="text-gray-700">{formData.isPublic ? 'Public' : 'Private'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Story Preview</p>
                  <p className="text-gray-700 line-clamp-3">{formData.story.substring(0, 150)}...</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                <FaInfoCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  Once you create your campaign, you'll be able to share it with friends and family. You can edit details later.
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="ml-auto bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Create Fundraiser</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFundraiser;