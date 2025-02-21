import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);

    // Fetch complete user details
    const response = await fetch(`http://localhost:5000/api/auth/${userData.userId}`, {
      headers: {
        'Authorization': `Bearer ${userData.token}`
      }
    });
    const userDetails = await response.json();
    setUser({ ...userData, ...userDetails });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;