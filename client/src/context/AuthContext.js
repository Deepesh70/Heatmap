import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Set the default auth header for all axios requests when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    const res = await axios.post('http://localhost:5001/api/users/login', { email, password });
    setToken(res.data.token);
    setLoading(false);
  };
  
  const signup = async (email, password) => {
    setLoading(true);
    const res = await axios.post('http://localhost:5001/api/users/signup', { email, password });
    setToken(res.data.token);
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
  };

  const authContextValue = { token, login, signup, logout, loading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};