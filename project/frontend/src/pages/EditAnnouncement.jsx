import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditAnnouncement() {
  const { announcementId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/announcements/${announcementId}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch(error => console.error('Error fetching announcement:', error));
  }, [announcementId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated announcement:', data);
        navigate(`/profile/${data.user}`);
      })
      .catch(error => console.error('Error updating announcement:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
      </form>
    </div>
  );
}

export default EditAnnouncement;