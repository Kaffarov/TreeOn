// src/pages/donor/TreeDetailsPrivate.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaArrowLeft, 
  FaTree, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser, 
  FaLeaf,
  FaHeart,
  FaDownload,
  FaShareAlt
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const TreeDetailsPrivate = () => {
  const { id } = useParams();

  // Mock tree data (in real app, fetch based on id)
  const tree = {
    id: id || 'T12345',
    species: 'Oak',
    commonName: 'Oak',
    scientificName: 'Quercus robur',
    donorName: 'John Doe',
    farmer: 'Maria Santos',
    planter: 'Peter Mwangi',
    location: 'Nakuru, Kenya',
    coordinates: { lat: -0.3031, lng: 36.0800 },
    plantedDate: '2026-02-15',
    status: 'alive',
    healthStatus: 'healthy',
    notes: 'Planted near the river, doing well.',
    imageUrl: 'https://via.placeholder.com/600x400?text=Oak+Tree',
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleDownloadCertificate = () => {
    toast.success('Certificate download started (mock)');
  };

  if (!tree) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tree not found</h2>
          <Link to="/dashboard/trees" className="text-primary-600 hover:underline">
            Back to My Trees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/dashboard/trees"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to My Trees
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">Tree Details</h1>
          <p className="text-gray-600">ID: {tree.id}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column: Tree info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tree image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img src={tree.imageUrl} alt={tree.species} className="w-full h-64 object-cover" />
            </motion.div>

            {/* Details card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tree Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Species</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaTree className="mr-2 text-primary-500" />
                    {tree.species} ({tree.scientificName})
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium text-gray-800">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      tree.status === 'alive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tree.status.charAt(0).toUpperCase() + tree.status.slice(1)}
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
                  <p className="text-gray-500 text-sm">Health</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaHeart className="mr-2 text-primary-500" />
                    {tree.healthStatus.charAt(0).toUpperCase() + tree.healthStatus.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-500" />
                    {tree.location}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm">Coordinates</p>
                  <p className="font-mono text-sm text-gray-700">
                    {tree.coordinates.lat.toFixed(6)}, {tree.coordinates.lng.toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Donor</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaUser className="mr-2 text-primary-500" />
                    {tree.donorName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Farmer</p>
                  <p className="font-medium text-gray-800 flex items-center">
                    <FaLeaf className="mr-2 text-primary-500" />
                    {tree.farmer}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Planter</p>
                  <p className="font-medium text-gray-800">{tree.planter}</p>
                </div>
              </div>
              {tree.notes && (
                <div className="mt-4">
                  <p className="text-gray-500 text-sm">Notes</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{tree.notes}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column: Map & Actions */}
          <div className="space-y-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden h-64"
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
                  <Popup>{tree.species} - {tree.id}</Popup>
                </Marker>
              </MapContainer>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadCertificate}
                  className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
                >
                  <FaDownload />
                  <span>Download Certificate</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center space-x-2"
                >
                  <FaShareAlt />
                  <span>Share Link</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetailsPrivate;