// src/pages/donor/MyMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaMapMarkerAlt, FaList, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Custom marker icon (teardrop shape with configurable color)
const getMarkerIcon = (isSelected) => {
  const color = isSelected ? '#4CAF50' : '#2196F3'; // green when selected, blue otherwise
  return L.divIcon({
    className: 'custom-tree-marker',
    html: `<div style="
      width: 30px;
      height: 30px;
      background-color: ${color};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      border: 2px solid white;
    "><div style="
      width: 12px;
      height: 12px;
      background-color: white;
      border-radius: 50%;
      position: relative;
      top: 8px;
      left: 8px;
    "></div></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],      // tip at bottom
    popupAnchor: [0, -30],     // popup above
  });
};

// Component to fit map bounds to markers initially
function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
}

// Component to fly to selected tree
function FlyToSelected({ selectedTree }) {
  const map = useMap();
  useEffect(() => {
    if (selectedTree) {
      map.flyTo([selectedTree.lat, selectedTree.lng], 8, { duration: 1.5 });
    }
  }, [selectedTree, map]);
  return null;
}

const MyMap = () => {
  const [showList, setShowList] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);

  // Mock donor's trees (in real app, fetch from API)
  const trees = [
    { id: 'T12345', species: 'Oak', lat: -1.2921, lng: 36.8219, location: 'Nakuru, Kenya', plantedDate: '2026-02-15' },
    { id: 'T12346', species: 'Mahogany', lat: -3.4653, lng: -62.2159, location: 'Amazonas, Brazil', plantedDate: '2026-02-10' },
    { id: 'T12347', species: 'Mangrove', lat: 7.1907, lng: 125.4553, location: 'Davao, Philippines', plantedDate: '2026-02-05' },
    { id: 'T12348', species: 'Pine', lat: 7.5399, lng: 39.2399, location: 'Oromia, Ethiopia', plantedDate: '2026-01-28' },
    { id: 'T12349', species: 'Teak', lat: -1.2921, lng: 116.8219, location: 'Kalimantan, Indonesia', plantedDate: '2026-01-15' },
  ];

  const handleSidebarItemClick = (tree) => {
    setSelectedTree(tree);
  };

  const handleMarkerClick = (tree) => {
    setSelectedTree(tree);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header with toggle button */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Trees Map</h1>
        <button
          onClick={() => setShowList(!showList)}
          className="bg-primary-600 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition"
        >
          <FaList />
          <span>{showList ? 'Hide List' : 'Show List'}</span>
        </button>
      </div>

      {/* Map container */}
      <div className="flex-1 relative overflow-hidden">
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {trees.map((tree) => (
            <Marker
              key={tree.id}
              position={[tree.lat, tree.lng]}
              icon={getMarkerIcon(tree.id === selectedTree?.id)}
              eventHandlers={{ click: () => handleMarkerClick(tree) }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{tree.species}</p>
                  <p>ID: {tree.id}</p>
                  <p>Planted: {tree.plantedDate}</p>
                  <p>{tree.location}</p>
                  <Link
                    to={`/dashboard/tree/${tree.id}`}
                    className="text-primary-600 hover:underline mt-1 inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
          <FitBounds markers={trees} />
          <FlyToSelected selectedTree={selectedTree} />
        </MapContainer>

        {/* Floating Sidebar */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden flex flex-col z-10"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Your Trees</h2>
                <button
                  onClick={() => setShowList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">
                  {trees.map((tree) => (
                    <div
                      key={tree.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                        selectedTree?.id === tree.id ? 'border-primary-500 bg-primary-50' : ''
                      }`}
                      onClick={() => handleSidebarItemClick(tree)}
                    >
                      <div className="flex items-start">
                        <FaTree className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{tree.species}</p>
                          <p className="text-xs text-gray-500">ID: {tree.id}</p>
                          <p className="text-xs text-gray-500 truncate">{tree.location}</p>
                          <p className="text-xs text-gray-400">Planted: {tree.plantedDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyMap;