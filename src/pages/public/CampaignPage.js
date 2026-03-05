// src/pages/public/CampaignPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaUsers, 
  FaClock, 
  FaFlag,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const CampaignPage = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState(25);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Mock campaign data (in real app, fetch based on id)
  const campaign = {
    id: parseInt(id) || 1,
    title: 'Restore the Amazon Rainforest',
    organizer: 'TreeOn Foundation',
    goal: 50000,
    raised: 32450,
    donors: 187,
    daysLeft: 15,
    description: 'Help us plant 10,000 native trees in the Brazilian Amazon. This area was devastated by fires, and we are working with local communities to restore the forest and its biodiversity.',
    story: 'The Amazon rainforest is often called the "lungs of the Earth". In partnership with indigenous communities, we are planting a mix of hardwood and fruit trees to restore habitat, prevent erosion, and provide sustainable income for local families.',
    image: 'https://via.placeholder.com/1200x600?text=Amazon+Campaign',
    updates: [
      { date: '2026-02-20', message: 'First 2,000 seedlings delivered to partner farmers!' },
      { date: '2026-02-10', message: 'Campaign launched – thank you for your support!' },
    ],
    topDonors: [
      { name: 'Anonymous', amount: 500 },
      { name: 'Green Future Foundation', amount: 2500 },
      { name: 'Emma Watson', amount: 1000 },
      { name: 'Carlos M.', amount: 150 },
    ],
    recentDonors: [
      { name: 'John D.', amount: 50 },
      { name: 'Maria S.', amount: 25 },
      { name: 'Anonymous', amount: 100 },
      { name: 'David K.', amount: 75 },
    ],
    relatedCampaigns: [
      { id: 2, title: 'Mangrove Restoration - Philippines', image: 'https://via.placeholder.com/300x200?text=Mangroves', raised: 18450, goal: 30000 },
      { id: 3, title: 'Reforest Kenya', image: 'https://via.placeholder.com/300x200?text=Kenya', raised: 22300, goal: 40000 },
    ],
  };

  const progress = (campaign.raised / campaign.goal) * 100;

  const handleDonate = () => {
    toast.success(`Thank you for your €${donationAmount} donation! (mock)`);
    // In real app, redirect to checkout
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to campaigns */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/campaigns" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition">
          <FaArrowLeft className="mr-2" /> Back to Campaigns
        </Link>
      </div>

      {/* Hero */}
      <section className="relative">
        <img src={campaign.image} alt={campaign.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center space-x-4 mb-3">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                <span className="flex items-center"><FaFlag className="mr-1" /> Organized by {campaign.organizer}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{campaign.title}</h1>
              <p className="text-xl text-gray-200">{campaign.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Story & Updates */}
          <div className="lg:w-2/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">The Story</h2>
              <p className="text-gray-700 leading-relaxed">{campaign.story}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Updates</h2>
              <div className="space-y-4">
                {campaign.updates.map((update, idx) => (
                  <div key={idx} className="border-l-4 border-primary-500 pl-4 py-1">
                    <p className="text-sm text-gray-500">{update.date}</p>
                    <p className="text-gray-700">{update.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Donation Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-200">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-800">€{campaign.raised.toLocaleString()}</span>
                  <span className="text-gray-500">of €{campaign.goal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-600 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span className="flex items-center"><FaUsers className="mr-1" /> {campaign.donors} donors</span>
                  <span className="flex items-center"><FaClock className="mr-1" /> {campaign.daysLeft} days left</span>
                </div>
              </div>

              {/* Donation Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Donation amount</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setDonationAmount(amt)}
                      className={`px-4 py-2 border rounded-lg transition ${
                        donationAmount === amt
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                      }`}
                    >
                      €{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                  min="1"
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    Donate anonymously
                  </label>
                </div>
                <button
                  onClick={handleDonate}
                  className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary-700 transition flex items-center justify-center space-x-2"
                >
                  <FaHeart />
                  <span>Donate €{donationAmount}</span>
                </button>
              </div>

              {/* Share */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="text-primary-600 font-medium flex items-center"
                >
                  <FaShare className="mr-2" /> Share this campaign
                </button>
                {showShareOptions && (
                  <div className="flex space-x-3 mt-3">
                    <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><FaFacebook /></a>
                    <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"><FaTwitter /></a>
                    <a href="#" className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"><FaLinkedin /></a>
                  </div>
                )}
              </div>

              {/* Top Donors */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold text-gray-800 mb-2">🎉 Top Donors</h3>
                <ul className="space-y-1 text-sm">
                  {campaign.topDonors.map((donor, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{donor.name}</span>
                      <span className="font-medium">€{donor.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Donors */}
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Recent Donations</h3>
                <ul className="space-y-1 text-sm">
                  {campaign.recentDonors.map((donor, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{donor.name}</span>
                      <span className="font-medium">€{donor.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Campaigns */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">More Campaigns You Can Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {campaign.relatedCampaigns.map(rel => (
              <Link key={rel.id} to={`/campaigns/${rel.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={rel.image} alt={rel.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{rel.title}</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>€{rel.raised.toLocaleString()}</span>
                    <span className="text-gray-500">of €{rel.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${(rel.raised / rel.goal) * 100}%` }}></div>
                  </div>
                  <span className="text-primary-600 text-sm">View Campaign →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignPage;
