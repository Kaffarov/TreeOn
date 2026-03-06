// src/pages/farmer/MyLand.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaTree, FaRuler, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MyLand = () => {
  // Mock land parcels data
  const [parcels, setParcels] = useState([
    {
      id: 1,
      name: 'North Field',
      size: 2.5, // hectares
      trees: 320,
      coordinates: [
        [-1.2921, 36.8219],
        [-1.295, 36.825],
        [-1.298, 36.822],
        [-1.295, 36.818],
      ], // polygon
      center: [-1.295, 36.8215],
    },
    {
      id: 2,
      name: 'Riverside',
      size: 1.8,
      trees: 210,
      coordinates: [
        [-1.288, 36.815],
        [-1.291, 36.818],
        [-1.294, 36.814],
        [-1.291, 36.812],
      ],
      center: [-1.291, 36.815],
    },
  ]);

  const [selectedParcel, setSelectedParcel] = useState(null);

  const handleAddParcel = () => {
    toast.success('Add parcel feature (mock)');
  };

  const handleEditParcel = (id) => {
    toast.success(`Edit parcel ${id} (mock)`);
  };

  const handleDeleteParcel = (id) => {
    if (window.confirm('Delete this land parcel?')) {
      setParcels(prev => prev.filter(p => p.id !== id));
      if (selectedParcel?.id === id) setSelectedParcel(null);
      toast.success('Parcel deleted');
    }
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
            <h1 className="text-3xl font-bold text-gray-800">My Land</h1>
            <p className="text-gray-600 mt-2">View and manage your land parcels.</p>
          </div>
          <button
            onClick={handleAddParcel}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Parcel</span>
          </button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Parcels</p>
            <p className="text-2xl font-bold text-gray-800">{parcels.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Land Area</p>
            <p className="text-2xl font-bold text-gray-800">
              {parcels.reduce((sum, p) => sum + p.size, 0).toFixed(1)} ha
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-500 text-sm">Total Trees</p>
            <p className="text-2xl font-bold text-gray-800">
              {parcels.reduce((sum, p) => sum + p.trees, 0)}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden"
            style={{ height: '500px' }}
          >
            <MapContainer
              center={[-1.2921, 36.8219]}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {parcels.map((parcel) => (
                <Polygon
                  key={parcel.id}
                  positions={parcel.coordinates}
                  pathOptions={{
                    color: selectedParcel?.id === parcel.id ? '#2e8b57' : '#3388ff',
                    fillColor: selectedParcel?.id === parcel.id ? '#2e8b57' : '#3388ff',
                    fillOpacity: 0.3,
                  }}
                  eventHandlers={{
                    click: () => setSelectedParcel(parcel),
                  }}
                />
              ))}
              {parcels.map((parcel) => (
                <Marker
                  key={`marker-${parcel.id}`}
                  position={parcel.center}
                  eventHandlers={{
                    click: () => setSelectedParcel(parcel),
                  }}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{parcel.name}</h3>
                      <p>Size: {parcel.size} ha</p>
                      <p>Trees: {parcel.trees}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>

          {/* Parcels List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 overflow-y-auto max-h-[500px]"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Parcels</h2>
            {parcels.length > 0 ? (
              <div className="space-y-3">
                {parcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition ${
                      selectedParcel?.id === parcel.id ? 'border-primary-500 bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedParcel(parcel)}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-800">{parcel.name}</h3>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditParcel(parcel.id);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteParcel(parcel.id);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaRuler className="mr-2" /> {parcel.size} hectares
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaTree className="mr-2" /> {parcel.trees} trees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FaMapMarkerAlt className="text-4xl mx-auto mb-2 text-gray-300" />
                <p>No land parcels added yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyLand;