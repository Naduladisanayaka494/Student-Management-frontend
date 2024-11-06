// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password, role) => {
    const apiUrl = role === 'student'
      ? 'http://localhost:5000/api/students/login'
      : 'http://localhost:5000/api/teachers/login';

    try {
      const response = await axios.post(apiUrl, { email, password });
      setUser({ ...response.data, role }); // Save user data with role (student/teacher)
      localStorage.setItem('user', JSON.stringify({ ...response.data, role }));
      role === 'teacher' ? navigate('/teacher') : navigate('/student');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
