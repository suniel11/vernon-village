import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Install lucide-react for icons
import AuthContext from "../context/AuthContext";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  console.log('User:', user); // Add this line to debug

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Logo */}
        <Link to="/home" className="text-2xl font-bold">
          Vernon Village
        </Link>

       
        {/* Right - Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link className="hover:text-gray-300 transition" to="/">Home</Link></li>
          <li><Link className="hover:text-gray-300 transition" to="/announcements">Announcements</Link></li>
          <li><Link className="hover:text-gray-300 transition" to="/submit">Submit Announcement</Link></li>
          <li><Link className="hover:text-gray-300 transition" to="/register">Register</Link></li>
          <li><Link className="hover:text-gray-300 transition" to="/login">Login</Link></li>
          {user && (
            <>
              <li>
                <Link to={`/profile/${user.userId}`}>
                  {user.profilePic ? (
                    <img
                      src={`http://localhost:5000/${user.profilePic}`}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="hover:text-gray-300 transition">Profile</span>
                  )}
                </Link>
              </li>
              <li><button className="hover:text-gray-300 transition" onClick={logout}>Logout</button></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 text-white text-center py-4 space-y-2">
          <li><Link className="block hover:bg-blue-800 p-2" to="/">Home</Link></li>
          <li><Link className="block hover:bg-blue-800 p-2" to="/announcements">Announcements</Link></li>
          <li><Link className="block hover:bg-blue-800 p-2" to="/submit">Submit Announcement</Link></li>
          <li><Link className="block hover:bg-blue-800 p-2" to="/register">Register</Link></li>
          <li><Link className="block hover:bg-blue-800 p-2" to="/login">Login</Link></li>
         
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
