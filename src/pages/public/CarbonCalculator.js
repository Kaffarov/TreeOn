// src/pages/public/CarbonCalculator.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCar, 
  FaPlane, 
  FaBolt, 
  FaTrash, 
  FaTree,
  FaCalculator,
  FaLeaf,
  FaGlobeAmericas
} from 'react-icons/fa';

const CarbonCalculator = () => {
  // State for form inputs
  const [inputs, setInputs] = useState({
    carKm: '',
    flights: '',
    electricity: '',
    waste: '',
  });

  // State for results
  const [results, setResults] = useState(null);

  // Conversion factors (mock, kg CO2 per unit)
  const factors = {
    car: 0.21,        // per km
    flight: 250,      // per flight (average short-haul)
    electricity: 0.5, // per kWh
    waste: 500,       // per ton of waste
  };

  // Tree sequestration rate (kg CO2 per tree per year)
  const treeSequestration = 25; // kg CO2/tree/year

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateFootprint = (e) => {
    e.preventDefault();

    // Parse inputs (default to 0 if empty)
    const carKm = parseFloat(inputs.carKm) || 0;
    const flights = parseFloat(inputs.flights) || 0;
    const electricity = parseFloat(inputs.electricity) || 0;
    const waste = parseFloat(inputs.waste) || 0;

    // Calculate total CO2 in kg
    const carCO2 = carKm * factors.car;
    const flightsCO2 = flights * factors.flight;
    const electricityCO2 = electricity * factors.electricity;
    const wasteCO2 = waste * factors.waste;

    const totalCO2 = carCO2 + flightsCO2 + electricityCO2 + wasteCO2;

    // Calculate trees needed
    const treesNeeded = Math.ceil(totalCO2 / treeSequestration);

    setResults({
      totalCO2: totalCO2.toFixed(1),
      treesNeeded,
      breakdown: {
        car: carCO2.toFixed(1),
        flights: flightsCO2.toFixed(1),
        electricity: electricityCO2.toFixed(1),
        waste: wasteCO2.toFixed(1),
      },
    });
  };

  const resetCalculator = () => {
    setInputs({ carKm: '', flights: '', electricity: '', waste: '' });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaGlobeAmericas className="text-6xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Carbon Footprint Calculator</h1>
            <p className="text-xl max-w-2xl mx-auto text-primary-100">
              Estimate your annual carbon footprint and see how many trees you need to plant to offset it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200"
          >
            <form onSubmit={calculateFootprint} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Car Travel */}
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <FaCar className="mr-2 text-primary-500" /> Car Travel (km/year)
                  </label>
                  <input
                    type="number"
                    name="carKm"
                    value={inputs.carKm}
                    onChange={handleChange}
                    placeholder="e.g., 15000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="100"
                  />
                </div>

                {/* Flights */}
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <FaPlane className="mr-2 text-primary-500" /> Flights (per year)
                  </label>
                  <input
                    type="number"
                    name="flights"
                    value={inputs.flights}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="1"
                  />
                </div>

                {/* Electricity */}
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <FaBolt className="mr-2 text-primary-500" /> Electricity (kWh/month)
                  </label>
                  <input
                    type="number"
                    name="electricity"
                    value={inputs.electricity}
                    onChange={handleChange}
                    placeholder="e.g., 300"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="10"
                  />
                </div>

                {/* Waste */}
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <FaTrash className="mr-2 text-primary-500" /> Waste (kg/week)
                  </label>
                  <input
                    type="number"
                    name="waste"
                    value={inputs.waste}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
                >
                  <FaCalculator />
                  <span>Calculate</span>
                </button>
                <button
                  type="button"
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Results */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Results</h2>
                <div className="bg-primary-50 p-6 rounded-xl">
                  <div className="text-center mb-6">
                    <p className="text-lg text-gray-600">Total Annual CO₂ Footprint</p>
                    <p className="text-4xl font-bold text-primary-600">{results.totalCO2} kg</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Car</p>
                      <p className="font-semibold">{results.breakdown.car} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Flights</p>
                      <p className="font-semibold">{results.breakdown.flights} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Electricity</p>
                      <p className="font-semibold">{results.breakdown.electricity} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Waste</p>
                      <p className="font-semibold">{results.breakdown.waste} kg</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xl text-gray-700 mb-2">
                      You need to plant{' '}
                      <span className="font-bold text-primary-600 text-3xl">
                        {results.treesNeeded}
                      </span>{' '}
                      trees per year to offset your footprint.
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      (Based on {treeSequestration} kg CO₂ absorbed per tree per year)
                    </p>
                    <Link
                      to="/donate"
                      className="inline-flex items-center bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition space-x-2"
                    >
                      <FaTree />
                      <span>Plant Your Trees</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gray-50 p-6 rounded-xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <FaLeaf className="text-primary-500 mr-2" /> How It Works
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This calculator provides a rough estimate of your carbon footprint based on common activities. 
              The actual CO₂ sequestration rate of trees varies by species, location, and age. 
              TreeOn plants a mix of native species to maximize carbon capture. 
              Use this as a starting point to understand your impact and take action.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CarbonCalculator;