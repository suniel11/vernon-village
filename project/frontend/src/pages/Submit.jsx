import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Submit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!title || !description) {
      setMessage({ type: 'error', text: 'Title and description are required' });
      return;
    }

    if (!userId) {
      setMessage({ type: 'error', text: 'User ID is missing. Please log in.' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          description, 
          status: 'pending', 
          user: userId 
        }),
      });

      if (!response.ok) throw new Error('Failed to submit announcement');
      
      setMessage({ type: 'success', text: 'Announcement submitted successfully!' });
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 10%, transparent 20%)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative max-w-2xl w-full z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            Share Your Announcement
          </h1>
          <p className="text-purple-200">
            Connect with the community through your important updates
          </p>
        </motion.div>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 mb-6 rounded-lg flex items-center ${
                message.type === 'error' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <svg
                className={`w-5 h-5 mr-3 ${
                  message.type === 'error' ? 'text-red-500' : 'text-emerald-500'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {message.type === 'error' ? (
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                ) : (
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-8 8 8 8 0 01-8-8zm12.707-1.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                )}
              </svg>
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Section */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Announcement Title
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear title"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Detailed Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your announcement in detail"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Publish Announcement'
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Submit;