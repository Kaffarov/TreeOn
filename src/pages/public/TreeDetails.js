// src/pages/public/TreeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaTree, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaLeaf, FaArrowLeft } from 'react-icons/fa';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TreeDetails = () => {
  const { id } = useParams();

  // Mock tree data – in real app, fetch based on id
  const tree = {
    id: id || 'T12345',
    species: 'Oak',
    scientificName: 'Quercus robur',
    donor: 'John Smith',
    isAnonymous: false,
    location: 'Nakuru, Kenya',
    coordinates: { lat: -0.3031, lng: 36.0800 },
    plantedDate: '2026-02-15',
    status: 'alive',
    description: 'This oak was planted as part of the Mau Forest restoration project. It is thriving and provides habitat for local birds.',
    image: 'https://via.placeholder.com/600x400?text=Oak+Tree',
  };

  // If tree not found (in real app), show 404-like message
  if (!tree) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tree not found</h2>
          <Link to="/map" className="text-primary-600 hover:underline">
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/map" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition">
          <FaArrowLeft className="mr-2" /> Back to Map
        </Link>
      </div>

      {/* Tree image */}
      <div className="relative h-64 md:h-96">
        <img src={tree.image} alt={tree.species} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{tree.species}</h1>
          <p className="text-lg">{tree.location}</p>
        </div>
      </div>

      {/* Main content */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Details */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tree Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Scientific Name</p>
                  <p className="font-medium text-gray-800 italic">{tree.scientificName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium text-gray-800">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {tree.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Planted Date</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    {tree.plantedDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Donor</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaUser className="mr-2 text-primary-500" />
                    {tree.isAnonymous ? 'Anonymous' : tree.donor}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-500" />
                    {tree.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Coordinates: {tree.coordinates.lat.toFixed(4)}, {tree.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-gray-700">{tree.description}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column: Map */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden h-80"
            >
              <MapContainer
                center={[tree.coordinates.lat, tree.coordinates.lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[tree.coordinates.lat, tree.coordinates.lng]}>
                  <Popup>
                    {tree.species} – planted {tree.plantedDate}
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreeDetails;