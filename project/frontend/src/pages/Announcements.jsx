import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/announcements');
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.title || !formData.description) {
      setMessage({ type: 'error', text: 'Title and description are required' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/announcements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData,
          user: userId,
          status: 'submitted'
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setMessage({ type: 'success', text: 'Submission successful!' });
      setFormData({ title: '', description: '', status: 'draft' });
      await fetchAnnouncements();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Submission Portal
          </h1>
          <p className="text-gray-600">
            Share your announcements and view community submissions
          </p>
        </motion.div>

        {/* Submission Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">New Submission</h2>
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 mb-6 rounded-lg flex items-center ${
                  message.type === 'error' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
                }`}
              >
                {/* Message icon and text */}
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter submission title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of your submission"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      {/* Loading spinner */}
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Announcement'}
              </button>
              <span className={`px-3 py-1 rounded-full text-sm ${statusColors[formData.status]}`}>
                {formData.status}
              </span>
            </div>
          </form>
        </motion.div>

        {/* Submissions List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {announcements.map((submission) => (
              <motion.div
                key={submission._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{submission.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[submission.status]}`}>
                    {submission.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{submission.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">Submitted by:</span>
                  <span className="font-medium">
                    {submission.user?.name || 'Anonymous'}
                  </span>
                </div>
                {submission.createdAt && (
                  <div className="mt-3 text-xs text-gray-400">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Announcements;