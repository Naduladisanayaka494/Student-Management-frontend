// src/components/MyCourses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
const MyCourses = () => {
    const token = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
     const   teacherid = decodedToken.id;
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/my-courses/`+ teacherid);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [ teacherid]);

  const handleEdit = (courseId) => {
    // Navigate to edit page or open modal for editing course
    console.log('Edit course', courseId);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/my-courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Courses Created by You</h2>
      <div className="list-group">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course._id} className="list-group-item">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(course._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
