// src/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
const StudentDashboard = () => {
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const   student = decodedToken.id;
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: user.token },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [user.token]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/enroll/`+student,
        {},
        { headers: { Authorization: user.token } }
      );
      alert('Enrolled in course successfully');
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header">Student Dashboard - Available Courses</div>
            <div className="card-body">
              <ul className="list-group">
                {courses.map((course) => (
                  <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {course.title}
                    <button className="btn btn-success" onClick={() => handleEnroll(course._id)}>Enroll</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
