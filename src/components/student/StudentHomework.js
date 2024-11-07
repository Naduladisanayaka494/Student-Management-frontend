// src/components/StudentHomework.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
const StudentHomework = () => {
  const [homework, setHomework] = useState([]);
  const { user } = useAuth();
   const token = localStorage.getItem("user");
   const decodedToken = jwtDecode(token);
   const student = decodedToken.id;
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const response = await axios.get(`/api/students/students/${student}/homework`, {
      
        });
        setHomework(response.data);
      } catch (error) {
        console.error("Error fetching homework:", error);
      }
    };

    if (user && user.role === "student") {
      fetchHomework();
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Homework</h2>
      {homework.length > 0 ? (
        homework.map((course) => (
          <div key={course.courseId} className="mb-4">
            <h4>{course.courseTitle}</h4>
            <ul className="list-group">
              {course.homeworks.map((hw, index) => (
                <li key={index} className="list-group-item">
                  <strong>Title:</strong> {hw.title}
                  <br />
                  <strong>Description:</strong> {hw.description}
                  <br />
                  <strong>Due Date:</strong>{" "}
                  {new Date(hw.dueDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No homework available.</p>
      )}
    </div>
  );
};

export default StudentHomework;
