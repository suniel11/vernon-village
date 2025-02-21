import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users:', data); // Print the data to the console
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Registered Users</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="p-4 border my-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              <Link to={`/profile/${user._id}`}>{user.name}</Link>
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))
      ) : (
        <p>No users registered yet.</p>
      )}
    </div>
  );
}

export default Users;