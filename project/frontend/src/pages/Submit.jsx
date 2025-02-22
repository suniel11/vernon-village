import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Submit = () => {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '' 
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage({ type: 'error', text: 'Both fields are required' });
      return;
    }

    if (formData.title.length > 100) {
      setMessage({ type: 'error', text: 'Title must be under 100 characters' });
      return;
    }

    if (!userId) {
      setMessage({ type: 'error', text: 'Please login to submit announcements' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          status: 'pending', 
          user: userId 
        }),
      });

      if (!response.ok) throw new Error('Submission failed. Please try again.');
      
      setMessage({ 
        type: 'success', 
        text: 'Announcement submitted for review!',
        reset: () => {
          setFormData({ title: '', description: '' });
          setShowPreview(false);
        }
      });

    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1%, transparent 15%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1%, transparent 15%)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative max-w-2xl w-full z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Share with the Community
          </h1>
          <p className="text-purple-200 font-light">
            Craft your announcement and connect with neighbors
          </p>
        </motion.div>

        {/* Message Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed bottom-6 right-6 p-4 rounded-lg flex items-center shadow-xl ${
                message.type === 'error' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-emerald-100 text-emerald-800'
              }`}
              onAnimationComplete={() => message.type === 'success' && message.reset?.()}
            >
              <svg className={`w-6 h-6 mr-3 ${message.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {message.type === 'error' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                )}
              </svg>
              <div>
                <p className="font-medium">{message.text}</p>
                {message.type === 'success' && (
                  <p className="text-sm opacity-80">Redirecting to home...</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Title
                  <span className="text-red-500 ml-1">*</span>
                  <span className="float-right text-xs text-gray-400">
                    {formData.title.length}/100
                  </span>
                </label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Community BBQ this Saturday..."
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                  <span className="text-red-500 ml-1">*</span>
                  <span className="float-right text-xs text-gray-400">
                    {formData.description.length}/500
                  </span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-48"
                  placeholder="Describe event details, location, time..."
                  maxLength={500}
                />
              </div>

              <div className="flex gap-4 items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex-1 relative"
                >
                  {loading ? (
                    <span className="opacity-0">Submitting...</span>
                  ) : (
                    'Publish Announcement'
                  )}
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-purple-50 border-t border-purple-100 p-6"
              >
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Preview</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="text-xl font-medium mb-2">{formData.title || 'Your Title'}</h4>
                    <p className="text-gray-600 whitespace-pre-line">
                      {formData.description || 'Your description will appear here...'}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                        👤
                      </span>
                      <span>Posted by You</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    This is how your announcement will appear to others
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Submit;