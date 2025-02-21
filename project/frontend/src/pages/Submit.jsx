import React, { useState } from 'react';

function Submit() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

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

      if (!response.ok) {
        throw new Error('Failed to submit announcement');
      }

      const data = await response.json();
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit Announcement</h1>

      {message && (
        <div className={`p-3 mb-4 text-sm rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter a title..."
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter a description..."
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Submit;
