// src/pages/admin/GenerateReports.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFilePdf, 
  FaFileExcel, 
  FaFileCsv, 
  FaCalendarAlt,
  FaDownload,
  FaChartBar,
  FaTree,
  FaUsers,
  FaHandsHelping,
  FaDollarSign,
  FaFilter
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const GenerateReports = () => {
  const [reportType, setReportType] = useState('impact');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [filters, setFilters] = useState({
    country: '',
    species: '',
    farmerId: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const reportTypes = [
    { id: 'impact', name: 'Impact Report', icon: FaChartBar, description: 'Trees planted, CO₂ offset, hectares restored' },
    { id: 'financial', name: 'Financial Report', icon: FaDollarSign, description: 'Donations, subscriptions, expenses' },
    { id: 'trees', name: 'Tree Planting Report', icon: FaTree, description: 'Detailed tree planting data by species, location' },
    { id: 'farmers', name: 'Farmer Report', icon: FaHandsHelping, description: 'Farmer engagement, training, harvests' },
    { id: 'custom', name: 'Custom Report', icon: FaFilter, description: 'Build your own report with custom fields' },
  ];

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const generateReport = () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      toast.error('Please select a date range');
      return;
    }

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      // Mock preview data
      const mockData = {
        impact: {
          totalTrees: 58420,
          totalCO2: 1460,
          hectaresRestored: 489,
          countries: 12,
          farmers: 287,
        },
        financial: {
          totalDonations: 125000,
          subscriptions: 89000,
          expenses: 45000,
          netProfit: 80000,
        },
        trees: [
          { species: 'Oak', count: 12450, location: 'Kenya' },
          { species: 'Mahogany', count: 8920, location: 'Brazil' },
          { species: 'Mangrove', count: 6780, location: 'Philippines' },
        ],
        farmers: [
          { name: 'Maria Santos', trees: 320, training: '3 sessions' },
          { name: 'John Kamau', trees: 280, training: '2 sessions' },
        ],
      }[reportType];
      setPreviewData(mockData);
      setIsGenerating(false);
      toast.success('Report generated successfully');
    }, 1500);
  };

  const exportReport = (format) => {
    toast.success(`Exporting as ${format.toUpperCase()}... (mock)`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Generate Reports</h1>
          <p className="text-gray-600 mt-2">Create custom reports and export data for analysis.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel: Report Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Report Configuration</h2>

              {/* Report Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <div className="space-y-2">
                  {reportTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition ${
                        reportType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <type.icon className={`mr-3 text-xl ${reportType === type.id ? 'text-primary-600' : 'text-gray-500'}`} />
                        <div>
                          <div className={`font-medium ${reportType === type.id ? 'text-primary-700' : 'text-gray-700'}`}>
                            {type.name}
                          </div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-1" /> Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      name="startDate"
                      value={dateRange.startDate}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name="endDate"
                      value={dateRange.endDate}
                      onChange={handleDateChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Filters (conditionally shown) */}
              {reportType === 'trees' && (
                <div className="mb-6 space-y-4">
                  <h3 className="font-medium text-gray-700">Filters</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Country</label>
                    <select
                      name="country"
                      value={filters.country}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Countries</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Indonesia">Indonesia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Species</label>
                    <select
                      name="species"
                      value={filters.species}
                      onChange={handleFilterChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">All Species</option>
                      <option value="Oak">Oak</option>
                      <option value="Mahogany">Mahogany</option>
                      <option value="Mangrove">Mangrove</option>
                      <option value="Pine">Pine</option>
                    </select>
                  </div>
                </div>
              )}

              {reportType === 'farmers' && (
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-1">Farmer ID</label>
                  <input
                    type="text"
                    name="farmerId"
                    value={filters.farmerId}
                    onChange={handleFilterChange}
                    placeholder="Enter farmer ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FaChartBar />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Panel: Report Preview & Export */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Report Preview</h2>
                {previewData && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => exportReport('pdf')}
                      className="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      <FaFilePdf />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => exportReport('excel')}
                      className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      <FaFileExcel />
                      <span>Excel</span>
                    </button>
                    <button
                      onClick={() => exportReport('csv')}
                      className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                    >
                      <FaFileCsv />
                      <span>CSV</span>
                    </button>
                  </div>
                )}
              </div>

              {previewData ? (
                <div className="space-y-6">
                  {reportType === 'impact' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">{(previewData.totalTrees).toLocaleString()}</div>
                        <div className="text-gray-600">Trees Planted</div>
                      </div>
                      <div className="bg-leaf-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">{(previewData.totalCO2).toLocaleString()} tons</div>
                        <div className="text-gray-600">CO₂ Offset</div>
                      </div>
                      <div className="bg-earth-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">{previewData.hectaresRestored} ha</div>
                        <div className="text-gray-600">Hectares Restored</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">{previewData.countries}</div>
                        <div className="text-gray-600">Countries</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">{previewData.farmers}</div>
                        <div className="text-gray-600">Partner Farmers</div>
                      </div>
                    </div>
                  )}

                  {reportType === 'financial' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">€{(previewData.totalDonations).toLocaleString()}</div>
                        <div className="text-gray-600">Total Donations</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">€{(previewData.subscriptions).toLocaleString()}</div>
                        <div className="text-gray-600">Subscriptions</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">€{(previewData.expenses).toLocaleString()}</div>
                        <div className="text-gray-600">Expenses</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary-600">€{(previewData.netProfit).toLocaleString()}</div>
                        <div className="text-gray-600">Net</div>
                      </div>
                    </div>
                  )}

                  {reportType === 'trees' && (
                    <div>
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Species</th>
                            <th className="text-left py-2">Count</th>
                            <th className="text-left py-2">Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3">{row.species}</td>
                              <td className="py-3 font-semibold">{row.count.toLocaleString()}</td>
                              <td className="py-3">{row.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {reportType === 'farmers' && (
                    <div>
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Farmer Name</th>
                            <th className="text-left py-2">Trees</th>
                            <th className="text-left py-2">Training</th>
                          </tr>
                        </thead>
                        <tbody>
                          {previewData.map((row, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="py-3">{row.name}</td>
                              <td className="py-3 font-semibold">{row.trees}</td>
                              <td className="py-3">{row.training}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {reportType === 'custom' && (
                    <div className="text-center text-gray-500 py-8">
                      Custom report builder coming soon.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-16 border-2 border-dashed border-gray-300 rounded-lg">
                  <FaChartBar className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p>Configure and generate a report to see preview</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;