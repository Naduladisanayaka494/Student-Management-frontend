// src/TeacherDashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateCourse = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/courses',
        { title, description },
        { headers: { Authorization: user.token } }
      );
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">Teacher Dashboard - Create a Course</div>
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
              <button className="btn button-primary btn-block mt-3" onClick={handleCreateCourse}>Create Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
