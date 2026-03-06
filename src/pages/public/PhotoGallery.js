// src/pages/public/PhotoGallery.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const PhotoGallery = () => {
  // Mock gallery data
  const allPhotos = [
    { id: 1, src: 'https://via.placeholder.com/600x400?text=Tree+Planting+1', alt: 'Tree planting in Kenya', category: 'planting', location: 'Kenya' },
    { id: 2, src: 'https://via.placeholder.com/600x400?text=Farmer+Maria', alt: 'Farmer Maria with her trees', category: 'farmers', location: 'Philippines' },
    { id: 3, src: 'https://via.placeholder.com/600x400?text=Mangrove+Seedlings', alt: 'Mangrove seedlings', category: 'nursery', location: 'Indonesia' },
    { id: 4, src: 'https://via.placeholder.com/600x400?text=Volunteer+Day', alt: 'Volunteers planting', category: 'events', location: 'Brazil' },
    { id: 5, src: 'https://via.placeholder.com/600x400?text=Training+Session', alt: 'Farmers training', category: 'training', location: 'Ethiopia' },
    { id: 6, src: 'https://via.placeholder.com/600x400?text=Tree+Tagging', alt: 'Geotagging a tree', category: 'process', location: 'Kenya' },
    { id: 7, src: 'https://via.placeholder.com/600x400?text=Forest+Restoration', alt: 'Restored forest', category: 'landscape', location: 'Brazil' },
    { id: 8, src: 'https://via.placeholder.com/600x400?text=Children+Planting', alt: 'School children planting', category: 'community', location: 'Philippines' },
    { id: 9, src: 'https://via.placeholder.com/600x400?text=Fruit+Harvest', alt: 'Harvesting fruit', category: 'farmers', location: 'Indonesia' },
  ];

  const categories = ['all', 'planting', 'farmers', 'nursery', 'events', 'training', 'landscape', 'community', 'process'];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = selectedCategory === 'all'
    ? allPhotos
    : allPhotos.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-100">
            Moments from our tree planting journey around the world.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-primary-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-64 object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition">
                  <p className="font-semibold">{photo.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filteredPhotos.length === 0 && (
          <div className="text-center text-gray-500 py-12">No photos in this category.</div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 transition"
              >
                <FaTimes />
              </button>
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                <p className="font-semibold">{selectedPhoto.location}</p>
                <p className="text-sm">{selectedPhoto.alt}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;