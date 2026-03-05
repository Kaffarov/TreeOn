// src/pages/admin/ManageContent.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaTimes,
  FaSave,
  FaImage,
  FaEye,
  FaFileAlt,
  FaHome,
  FaUsers,
  FaQuoteRight,
  FaHandshake
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ManageContent = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('homepage');

  // Mock data for different content types
  const [contentData, setContentData] = useState({
    homepage: {
      hero: {
        title: 'Plant Trees, Save the Planet',
        subtitle: 'Join a global community restoring forests.',
        ctaText: 'Plant Your First Tree',
        ctaLink: '/donate',
        image: 'https://via.placeholder.com/1200x400?text=Hero+Image'
      },
      stats: [
        { label: 'Trees Planted', value: '50,000+' },
        { label: 'Active Donors', value: '5,000+' },
        { label: 'Partner Farmers', value: '200+' },
        { label: 'Countries', value: '12' },
      ]
    },
    blog: [
      { id: 1, title: 'The Importance of Mangroves', author: 'Jane Green', date: '2026-03-01', published: true },
      { id: 2, title: 'Meet Our Farmers: Maria', author: 'John Forester', date: '2026-02-25', published: true },
      { id: 3, title: '2025 Impact Report', author: 'David Kim', date: '2026-02-10', published: false },
    ],
    testimonials: [
      { id: 1, name: 'David Chen', role: 'Monthly Donor', content: 'TreeOn makes it so easy to see the impact...', rating: 5 },
      { id: 2, name: 'Sarah Johnson', role: 'One-time Donor', content: 'I gifted trees to my family...', rating: 5 },
    ],
    partners: [
      { id: 1, name: 'EcoFund', logo: 'https://via.placeholder.com/120x60?text=EcoFund', url: 'https://ecofund.org' },
      { id: 2, name: 'GreenFuture', logo: 'https://via.placeholder.com/120x60?text=GreenFuture', url: 'https://greenfuture.org' },
    ],
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState(''); // 'homepage', 'blog', etc.

  // Form state
  const [formData, setFormData] = useState({});

  // Open modal for adding new item
  const handleAddNew = () => {
    setEditingItem(null);
    setModalType(activeTab);
    setFormData({});
    setIsModalOpen(true);
  };

  // Open modal for editing existing item
  const handleEdit = (item) => {
    setEditingItem(item);
    setModalType(activeTab);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Simulate API call
      setTimeout(() => {
        const newData = { ...contentData };
        if (activeTab === 'blog') {
          newData.blog = newData.blog.filter(item => item.id !== id);
        } else if (activeTab === 'testimonials') {
          newData.testimonials = newData.testimonials.filter(item => item.id !== id);
        } else if (activeTab === 'partners') {
          newData.partners = newData.partners.filter(item => item.id !== id);
        }
        setContentData(newData);
        toast.success('Item deleted successfully');
      }, 500);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      const newData = { ...contentData };
      if (modalType === 'blog') {
        if (editingItem) {
          // Update
          const index = newData.blog.findIndex(item => item.id === editingItem.id);
          newData.blog[index] = { ...formData, id: editingItem.id };
        } else {
          // Add new with temporary id
          const newId = Math.max(...newData.blog.map(i => i.id), 0) + 1;
          newData.blog.push({ ...formData, id: newId, published: true });
        }
      } else if (modalType === 'testimonials') {
        if (editingItem) {
          const index = newData.testimonials.findIndex(item => item.id === editingItem.id);
          newData.testimonials[index] = { ...formData, id: editingItem.id };
        } else {
          const newId = Math.max(...newData.testimonials.map(i => i.id), 0) + 1;
          newData.testimonials.push({ ...formData, id: newId });
        }
      } else if (modalType === 'partners') {
        if (editingItem) {
          const index = newData.partners.findIndex(item => item.id === editingItem.id);
          newData.partners[index] = { ...formData, id: editingItem.id };
        } else {
          const newId = Math.max(...newData.partners.map(i => i.id), 0) + 1;
          newData.partners.push({ ...formData, id: newId });
        }
      } else if (modalType === 'homepage') {
        // Homepage sections update
        newData.homepage = { ...newData.homepage, ...formData };
      }
      setContentData(newData);
      setIsModalOpen(false);
      toast.success(editingItem ? 'Item updated successfully' : 'Item added successfully');
    }, 500);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Render form fields based on modal type
  const renderFormFields = () => {
    switch (modalType) {
      case 'homepage':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
              <input
                type="text"
                name="hero.title"
                value={formData.hero?.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
              <input
                type="text"
                name="hero.subtitle"
                value={formData.hero?.subtitle || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero CTA Text</label>
              <input
                type="text"
                name="hero.ctaText"
                value={formData.hero?.ctaText || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, hero: { ...prev.hero, ctaText: e.target.value } }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero CTA Link</label>
              <input
                type="text"
                name="hero.ctaLink"
                value={formData.hero?.ctaLink || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, hero: { ...prev.hero, ctaLink: e.target.value } }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      case 'blog':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                rows="5"
                value={formData.content || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published</label>
              <select
                name="published"
                value={formData.published ? 'true' : 'false'}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.value === 'true' }))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </>
        );
      case 'testimonials':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                rows="4"
                value={formData.content || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={formData.rating || 5}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      case 'partners':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="url"
                name="logo"
                value={formData.logo || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'homepage', label: 'Homepage', icon: FaHome },
    { id: 'blog', label: 'Blog Posts', icon: FaFileAlt },
    { id: 'testimonials', label: 'Testimonials', icon: FaQuoteRight },
    { id: 'partners', label: 'Partners', icon: FaHandshake },
  ];

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
            <h1 className="text-3xl font-bold text-gray-800">Manage Content</h1>
            <p className="text-gray-600 mt-2">Edit homepage sections, blog posts, testimonials, and partner logos.</p>
          </div>
          {activeTab !== 'homepage' && (
            <button
              onClick={handleAddNew}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add New</span>
            </button>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'homepage' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Homepage Sections</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleEdit(contentData.homepage); }} className="space-y-4 max-w-2xl">
                {renderFormFields()}
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Blog Posts</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">ID</th>
                      <th className="text-left py-3">Title</th>
                      <th className="text-left py-3">Author</th>
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Published</th>
                      <th className="text-left py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentData.blog.map(post => (
                      <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3">{post.id}</td>
                        <td className="py-3 font-medium">{post.title}</td>
                        <td className="py-3">{post.author}</td>
                        <td className="py-3">{post.date}</td>
                        <td className="py-3">
                          {post.published ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Published</span>
                          ) : (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Draft</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Testimonials</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {contentData.testimonials.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex space-x-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <p className="text-gray-700 italic">"{item.content}"</p>
                    <div className="mt-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Partners</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentData.partners.map(partner => (
                  <div key={partner.id} className="border rounded-lg p-4 bg-white relative group flex flex-col items-center">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex space-x-1">
                      <button
                        onClick={() => handleEdit(partner)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(partner.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <img src={partner.logo} alt={partner.name} className="h-12 object-contain mb-2" />
                    <p className="text-sm font-medium text-center">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingItem ? 'Edit' : 'Add'} {modalType === 'blog' ? 'Blog Post' : modalType === 'testimonials' ? 'Testimonial' : modalType === 'partners' ? 'Partner' : 'Content'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {renderFormFields()}

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
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                  >
                    <FaSave />
                    <span>{editingItem ? 'Update' : 'Save'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageContent;