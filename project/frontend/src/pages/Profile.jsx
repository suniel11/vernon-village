import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State to manage form visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user:', data); // Print the data to the console
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setProfilePic(data.profilePic);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/announcements/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched announcements:', data); // Print the data to the console
        setAnnouncements(data);
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, [userId]);

  const handleEdit = (announcementId) => {
    navigate(`/edit-announcement/${announcementId}`);
  };

  const handleDelete = (announcementId) => {
    fetch(`http://localhost:5000/api/announcements/${announcementId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Deleted announcement:', data);
        setAnnouncements(announcements.filter(a => a._id !== announcementId));
      })
      .catch(error => console.error('Error deleting announcement:', error));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    fetch(`http://localhost:5000/api/auth/${userId}`, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated user:', data);
        setUser(data);
        setIsEditing(false); // Hide the form after updating
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      {user.profilePic && <img src={`http://localhost:5000/${user.profilePic}`} alt="Profile" className="w-32 h-32 rounded-full" />}
      <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
      {isEditing && (
        <form onSubmit={handleProfileUpdate} className="mt-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update Profile</button>
        </form>
      )}
      <h2 className="text-2xl font-bold mt-6">Announcements</h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="p-4 border my-4 rounded shadow">
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-600">{announcement.description}</p>
            <button onClick={() => handleEdit(announcement._id)} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={() => handleDelete(announcement._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        ))
      ) : (
        <p>No announcements yet.</p>
      )}
    </div>
  );
}

export default Profile;