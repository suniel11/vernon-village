import React, { useState } from 'react';

function Submit() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      console.error('Title and description are required');
      return;
    }
    fetch('http://localhost:5000/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        title, 
        description, 
        status: 'pending', 
        user: userId // Include user ID
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('Error submitting announcement:', error));
  };

  return (
    <div>
      <h1>Submit Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submit;
