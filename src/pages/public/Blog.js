// src/pages/public/Blog.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Mock blog posts data
  const allPosts = [
    { id: 1, title: 'The Importance of Mangroves in Coastal Protection', excerpt: 'Mangroves are vital for protecting coastlines from erosion and storms...', author: 'Dr. Jane Green', date: '2026-03-01', category: 'Ecology', image: 'https://via.placeholder.com/600x400?text=Mangroves' },
    { id: 2, title: 'Meet Our Farmers: Maria Santos from Philippines', excerpt: 'Maria has been partnering with TreeOn for over two years, planting hundreds of trees...', author: 'John Forester', date: '2026-02-25', category: 'Farmers', image: 'https://via.placeholder.com/600x400?text=Farmer+Maria' },
    { id: 3, title: '2025 Impact Report: A Year of Growth', excerpt: 'We planted over 50,000 trees last year. Read our full impact report...', author: 'David Kim', date: '2026-02-10', category: 'Impact', image: 'https://via.placeholder.com/600x400?text=Impact+Report' },
    { id: 4, title: 'How to Offset Your Carbon Footprint with TreeOn', excerpt: 'Calculate your carbon footprint and see how many trees you need to plant...', author: 'Sarah Johnson', date: '2026-02-05', category: 'Education', image: 'https://via.placeholder.com/600x400?text=Carbon+Footprint' },
    { id: 5, title: 'New Partnership with Global Reforestation Initiative', excerpt: 'We are excited to announce a new collaboration to expand our planting in Africa...', author: 'Michael Brown', date: '2026-01-28', category: 'Partners', image: 'https://via.placeholder.com/600x400?text=Partnership' },
    { id: 6, title: 'Pruning Techniques for Young Trees', excerpt: 'Learn the best practices for pruning to ensure healthy growth...', author: 'Carlos Mendez', date: '2026-01-20', category: 'Education', image: 'https://via.placeholder.com/600x400?text=Pruning' },
    { id: 7, title: 'TreeOn Featured in Eco Magazine', excerpt: 'Our work with farmers in Brazil was featured in this month’s issue...', author: 'Maria Silva', date: '2026-01-15', category: 'Press', image: 'https://via.placeholder.com/600x400?text=Magazine' },
    { id: 8, title: 'Volunteer Day: Planting in Kenya', excerpt: 'A photo essay from our recent volunteer event in Nakuru...', author: 'Peter Mwangi', date: '2026-01-10', category: 'Events', image: 'https://via.placeholder.com/600x400?text=Kenya' },
    { id: 9, title: 'The Science of Carbon Sequestration', excerpt: 'How trees absorb CO₂ and why it matters for climate change...', author: 'Dr. Jane Green', date: '2026-01-05', category: 'Science', image: 'https://via.placeholder.com/600x400?text=Carbon+Sequestration' },
  ];

  const categories = ['all', ...new Set(allPosts.map(post => post.category))];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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
            TreeOn Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto text-primary-100"
          >
            Stories, updates, and insights from our journey to restore the planet.
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {currentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <FaUser className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-primary-600 text-sm">
                        <FaTag className="mr-1" />
                        {post.category}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-primary-600 font-medium hover:text-primary-700"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border rounded-lg hover:bg-primary-600 hover:text-white transition ${
                        currentPage === i + 1 ? 'bg-primary-600 text-white' : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      <span className="float-right text-sm">
                        ({allPosts.filter(p => cat === 'all' || p.category === cat).length})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Blog;