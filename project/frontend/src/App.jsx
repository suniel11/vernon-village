import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Announcements from './pages/Announcements';
import Submit from './pages/Submit';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Home from './pages/Home';
import EditAnnouncement from './pages/EditAnnouncement';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Announcements />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-announcement/:announcementId" element={<PrivateRoute><EditAnnouncement /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
