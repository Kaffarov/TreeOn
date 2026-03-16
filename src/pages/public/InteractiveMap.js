// src/pages/public/InteractiveMap.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTree, FaSearch, FaTimes, FaInfoCircle } from 'react-icons/fa';

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
    popupAnchor: [0, -30],     // popup above the icon
  });
};

// Component to fit map bounds to markers initially
function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([20, 0], 2);
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

const InteractiveMap = () => {
  const [trees] = useState([
    { id: 'T12345', species: 'Mango', donor: 'John Smith', lat: -1.2921, lng: 36.8219, location: 'Nakuru, Kenya', plantedDate: '2026-02-15', isAnonymous: false },
    { id: 'T12348', species: 'Plum', donor: 'Michael Brown', lat: 7.5399, lng: 39.2399, location: 'Oromia, Ethiopia', plantedDate: '2026-01-28', isAnonymous: false },
    { id: 'T12353', species: 'Avocado', donor: 'John Kamau', lat: -1.3, lng: 36.7, location: 'Nairobi, Kenya', plantedDate: '2026-02-18', isAnonymous: false },
    { id: 'T12355', species: 'Mango', donor: 'Anonymous', lat: 9.8965, lng: 8.8583, location: 'Jos, Nigeria', plantedDate: '2026-03-01', isAnonymous: true },
    { id: 'T12356', species: 'Avocado', donor: 'Amina Bello', lat: 10.5105, lng: 7.4165, location: 'Kaduna, Nigeria', plantedDate: '2026-03-01', isAnonymous: false },
    { id: 'T12357', species: 'Guava', donor: 'Anonymous', lat: 4.9517, lng: 8.3220, location: 'Calabar, Nigeria', plantedDate: '2026-03-02', isAnonymous: true },
    { id: 'T12358', species: 'Plum', donor: 'Samuel Musa', lat: 8.8463, lng: 7.8736, location: 'Keffi, Nigeria', plantedDate: '2026-03-02', isAnonymous: false },
    { id: 'T12359', species: 'Grape', donor: 'Anonymous', lat: 10.3158, lng: 9.8442, location: 'Bauchi, Nigeria', plantedDate: '2026-03-02', isAnonymous: true },
    { id: 'T12360', species: 'Baobab', donor: 'Jean Pierre', lat: 4.2330, lng: 9.2330, location: 'Ekona, Cameroon', plantedDate: '2026-03-03', isAnonymous: false },
    { id: 'T12361', species: 'Papaya', donor: 'Anonymous', lat: 4.2890, lng: 9.4100, location: 'Muyuka, Cameroon', plantedDate: '2026-03-03', isAnonymous: true },
    { id: 'T12362', species: 'Mango', donor: 'Clara Ndzi', lat: 4.1550, lng: 9.2420, location: 'Buea, Cameroon', plantedDate: '2026-03-03', isAnonymous: false },
    { id: 'T12363', species: 'Avocado', donor: 'Anonymous', lat: 5.7510, lng: 9.3130, location: 'Mamfe, Cameroon', plantedDate: '2026-03-03', isAnonymous: true },
    { id: 'T12364', species: 'Guava', donor: 'Abdoulaye Hamid', lat: 7.3277, lng: 13.5847, location: 'Ngaoundere, Cameroon', plantedDate: '2026-03-04', isAnonymous: false },
    { id: 'T12365', species: 'Plum', donor: 'Anonymous', lat: 5.4430, lng: 10.0530, location: 'Dschang, Cameroon', plantedDate: '2026-03-04', isAnonymous: true },
    { id: 'T12366', species: 'Baobab', donor: 'Moussa Ali', lat: 10.5910, lng: 14.3150, location: 'Maroua, Cameroon', plantedDate: '2026-03-04', isAnonymous: false },
    { id: 'T12367', species: 'Papaya', donor: 'Anonymous', lat: 6.4667, lng: 12.6333, location: 'Tibati, Cameroon', plantedDate: '2026-03-04', isAnonymous: true },
    { id: 'T12368', species: 'Mango', donor: 'Hassan Bello', lat: 12.3780, lng: 14.2420, location: 'Fotokol, Cameroon', plantedDate: '2026-03-04', isAnonymous: false },
    { id: 'T12369', species: 'Avocado', donor: 'Anonymous', lat: 3.8000, lng: 10.1330, location: 'Édéa, Cameroon', plantedDate: '2026-03-05', isAnonymous: true },
    { id: 'T12370', species: 'Guava', donor: 'Marie Ekane', lat: 2.9370, lng: 9.9070, location: 'Kribi, Cameroon', plantedDate: '2026-03-05', isAnonymous: false },
    { id: 'T12371', species: 'Baobab', donor: 'Anonymous', lat: 12.7670, lng: -1.8000, location: 'Sourgoubila, Burkina Faso', plantedDate: '2026-03-05', isAnonymous: true },
    { id: 'T12372', species: 'Mango', donor: 'Issa Ouedraogo', lat: 11.1000, lng: -1.0000, location: 'Tiébélé, Burkina Faso', plantedDate: '2026-03-05', isAnonymous: false },
    { id: 'T12373', species: 'Papaya', donor: 'Anonymous', lat: 8.9000, lng: 11.3600, location: 'Jalingo, Nigeria', plantedDate: '2026-03-05', isAnonymous: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);

  const filteredTrees = trees.filter(tree =>
    tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tree.donor.toLowerCase().includes(searchTerm.toLowerCase()) && !tree.isAnonymous)
  );

  const handleSidebarItemClick = (tree) => {
    setSelectedTree(tree);
  };

  const handleMarkerClick = (tree) => {
    setSelectedTree(tree);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header with toggle button */}
      <div className="bg-white shadow-sm p-4 flex justify-end items-center">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          {showSidebar ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Map container */}
      <div className="flex-1 relative overflow-hidden">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredTrees.map((tree) => (
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
                  <p>Location: {tree.location}</p>
                  <p>Donor: {tree.isAnonymous ? 'Anonymous' : tree.donor}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <FitBounds markers={filteredTrees} />
          <FlyToSelected selectedTree={selectedTree} />
        </MapContainer>

        {/* Floating Sidebar - positioned below header */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden flex flex-col z-10"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Explore Trees</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4 border-b">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search species, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <p className="text-sm text-gray-500 mb-3">{filteredTrees.length} trees displayed</p>
                <div className="space-y-2">
                  {filteredTrees.map(tree => (
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
                          <p className="text-xs text-gray-400">
                            {tree.isAnonymous ? 'Anonymous donor' : tree.donor}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gray-50 text-xs text-gray-500 flex items-center">
                <FaInfoCircle className="mr-1 text-primary-500" />
                <span>Donor names appear only if public.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;