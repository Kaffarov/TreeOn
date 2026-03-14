// src/pages/public/InteractiveMap.js
import React, { useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTree, FaSearch, FaTimes, FaInfoCircle } from "react-icons/fa";

/* ----------------------------- Marker Factory ----------------------------- */

const createMarkerIcon = (selected) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width:32px;
        height:32px;
        background:${selected ? "#16a34a" : "#2563eb"};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,.35);
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        <div style="
          width:10px;
          height:10px;
          background:white;
          border-radius:50%;
          transform:rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });

/* ----------------------------- Map Helpers ----------------------------- */

function FitBounds({ markers }) {
  const map = useMap();

  React.useEffect(() => {
    if (!markers.length) return;

    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [markers, map]);

  return null;
}

function FlyToTree({ tree }) {
  const map = useMap();

  React.useEffect(() => {
    if (!tree) return;

    map.flyTo([tree.lat, tree.lng], 8, { duration: 1.4 });
  }, [tree, map]);

  return null;
}

/* ----------------------------- Component ----------------------------- */

const InteractiveMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);

  /* ----------------------------- Tree Data ----------------------------- */

  const trees = useMemo(
    () => [
      {
        id: "T12345",
        species: "Mango",
        donor: "John Smith",
        lat: -1.2921,
        lng: 36.8219,
        location: "Nakuru, Kenya",
        plantedDate: "2026-02-15",
        isAnonymous: false,
      },
      {
        id: "T12355",
        species: "Mango",
        donor: "Anonymous",
        lat: 9.8965,
        lng: 8.8583,
        location: "Jos, Nigeria",
        plantedDate: "2026-03-01",
        isAnonymous: true,
      },
      {
        id: "T12356",
        species: "Avocado",
        donor: "Amina Bello",
        lat: 10.5105,
        lng: 7.4165,
        location: "Kaduna, Nigeria",
        plantedDate: "2026-03-01",
        isAnonymous: false,
      },
      {
        id: "T12357",
        species: "Guava",
        donor: "Anonymous",
        lat: 4.9517,
        lng: 8.322,
        location: "Calabar, Nigeria",
        plantedDate: "2026-03-02",
        isAnonymous: true,
      },
    ],
    []
  );

  /* ----------------------------- Filtering ----------------------------- */

  const filteredTrees = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return trees.filter(
      (t) =>
        t.species.toLowerCase().includes(term) ||
        t.location.toLowerCase().includes(term) ||
        (!t.isAnonymous && t.donor.toLowerCase().includes(term))
    );
  }, [trees, searchTerm]);

  /* ----------------------------- Handlers ----------------------------- */

  const selectTree = useCallback((tree) => {
    setSelectedTree(tree);
  }, []);

  /* ----------------------------- Render ----------------------------- */

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm h-16 flex items-center justify-end px-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
        >
          {showSidebar ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative">

        <MapContainer
          center={[20, 0]}
          zoom={2}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {filteredTrees.map((tree) => (
            <Marker
              key={tree.id}
              position={[tree.lat, tree.lng]}
              icon={createMarkerIcon(tree.id === selectedTree?.id)}
              eventHandlers={{
                click: () => selectTree(tree),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{tree.species}</p>
                  <p>ID: {tree.id}</p>
                  <p>Planted: {tree.plantedDate}</p>
                  <p>{tree.location}</p>
                  <p>
                    Donor: {tree.isAnonymous ? "Anonymous" : tree.donor}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds markers={filteredTrees} />
          <FlyToTree tree={selectedTree} />

        </MapContainer>

        {/* Sidebar */}
        <AnimatePresence>

          {showSidebar && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 18 }}
              className="absolute top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg flex flex-col"
            >
              {/* Sidebar header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-gray-800">
                  Explore Trees
                </h2>

                <button onClick={() => setShowSidebar(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search species or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">

                {filteredTrees.map((tree) => (
                  <div
                    key={tree.id}
                    onClick={() => selectTree(tree)}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedTree?.id === tree.id
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <FaTree className="text-green-600 mr-2 mt-1" />

                      <div>
                        <p className="font-semibold">{tree.species}</p>
                        <p className="text-xs text-gray-500">
                          {tree.location}
                        </p>
                        <p className="text-xs text-gray-400">
                          {tree.isAnonymous
                            ? "Anonymous donor"
                            : tree.donor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-50 text-xs text-gray-500 flex items-center">
                <FaInfoCircle className="mr-1 text-green-600" />
                Donor names appear only if public.
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
};

export default InteractiveMap;