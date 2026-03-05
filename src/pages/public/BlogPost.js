// src/pages/public/BlogPost.js
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaFacebook, FaTwitter, FaLinkedin, FaArrowLeft } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();

  // Mock data – in real app, fetch based on id
  const post = {
    id: parseInt(id),
    title: 'The Importance of Mangroves in Coastal Protection',
    author: 'Dr. Jane Green',
    date: '2026-03-01',
    category: 'Ecology',
    image: 'https://via.placeholder.com/1200x600?text=Mangroves',
    content: `
      <p>Mangroves are vital for protecting coastlines from erosion and storms. They act as natural barriers, reducing wave energy and trapping sediments. This not only safeguards coastal communities but also creates rich habitats for marine life.</p>
      <p>At TreeOn, we partner with local communities to restore mangrove forests in the Philippines, Indonesia, and other regions. These efforts have already planted over 10,000 mangroves, restoring critical ecosystems and supporting fisheries.</p>
      <p>Beyond coastal protection, mangroves are exceptional carbon sinks. They store up to four times more carbon per hectare than tropical rainforests. This makes them a key ally in the fight against climate change.</p>
      <p>Our mangrove planting projects involve local farmers who nurture the seedlings and monitor their growth. This provides sustainable livelihoods while restoring the environment. In the coming year, we aim to double our mangrove planting efforts.</p>
      <p>You can support this work by donating to our mangrove fund or by subscribing to a plan that includes exclusive mangrove species.</p>
    `,
    tags: ['mangroves', 'coastal protection', 'carbon sequestration'],
    related: [
      { id: 2, title: 'Meet Our Farmers: Maria Santos from Philippines', image: 'https://via.placeholder.com/300x200?text=Farmer+Maria' },
      { id: 5, title: 'New Partnership with Global Reforestation Initiative', image: 'https://via.placeholder.com/300x200?text=Partnership' },
      { id: 8, title: 'Volunteer Day: Planting in Kenya', image: 'https://via.placeholder.com/300x200?text=Kenya' },
    ],
  };

  // If post not found, show 404-like message
  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary-600 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blog */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition">
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>

      {/* Hero */}
      <section className="relative">
        <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center text-sm mb-4 space-x-4">
                <span className="flex items-center"><FaCalendarAlt className="mr-1" /> {post.date}</span>
                <span className="flex items-center"><FaUser className="mr-1" /> {post.author}</span>
                <span className="flex items-center"><FaTag className="mr-1" /> {post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{post.title}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-3/4 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            {/* Share Buttons */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share This Post</h3>
              <div className="flex space-x-4">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                  <FaFacebook />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition">
                  <FaTwitter />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition">
                  <FaLinkedin />
                </a>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {post.related.map(rel => (
              <Link key={rel.id} to={`/blog/${rel.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={rel.image} alt={rel.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{rel.title}</h3>
                  <span className="text-primary-600 text-sm">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Placeholder */}
      <section className="py-12 container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments (2)</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">March 2, 2026</p>
            <p className="mt-2">Great article! Mangroves are so important.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">Maria Santos</p>
            <p className="text-sm text-gray-500">March 3, 2026</p>
            <p className="mt-2">I love planting mangroves in my community!</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
          <textarea rows="4" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Your comment..."></textarea>
          <button className="mt-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">Post Comment</button>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;