import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Vernon Village</h1>
      <ul>
        <li><Link className="mx-2" to="/">Home</Link></li>
        <li><Link className="mx-2" to="/announcements">Announcements</Link></li>
        <li><Link className="mx-2" to="/submit">Submit Announcement</Link></li>
        <li><Link className="mx-2" to="/register">Register</Link></li>
        <li><Link className="mx-2" to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
