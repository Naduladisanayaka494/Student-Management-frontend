// src/components/MyCourses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CourseEditModal from './CourseEditModal';
import { useAuth } from '../../context/AuthContext';

const MyCourses = () => {
  const token = localStorage.getItem('user');
  const decodedToken = jwtDecode(token);
  const teacherId = decodedToken.id;

  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse,setSelectedCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/my-courses/${teacherId}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
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
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(course)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {selectedCourse && (
        <CourseEditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          course={selectedCourse}
          onUpdate={handleUpdateCourse}
        />
      )}
    </div>
  );
};

export default MyCourses;
