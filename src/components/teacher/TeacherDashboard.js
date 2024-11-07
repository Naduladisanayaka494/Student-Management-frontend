// src/TeacherDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const teacher = decodedToken.id;
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirectToCourses, setRedirectToCourses] = useState(false); // State for redirection

  const handleCreateCourse = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/courses',
        { title, description, teacher },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert('Course created successfully');
      setRedirectToCourses(true); // Set redirect state to true after successful creation
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  // Redirect to /teacher/my-courses if redirectToCourses is true
  if (redirectToCourses) {
    return <Navigate to="/teacher/my-courses" />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">
              Teacher Dashboard - Create a Course
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Course Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                className="btn btn-success btn-block mt-3"
                onClick={handleCreateCourse}
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
