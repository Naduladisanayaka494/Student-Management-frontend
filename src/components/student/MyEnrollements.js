// src/components/MyEnrollments.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const MyEnrollments = () => {
  const token = localStorage.getItem("user");
  const decodedToken = jwtDecode(token);
  const student = decodedToken.id;
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch enrollments only if user is logged in and is a student
    if (user && user.role === "student") {
      const fetchEnrollments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/students/students/${student}/enrollments`
          );
          setEnrollments(response.data);
        } catch (error) {
          console.error("Error fetching enrollments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEnrollments();
    }
  }, [user, student]);

  // Function to unenroll from a course
  const unenroll = async (courseId) => {
    try {
      await axios.post("http://localhost:5000/api/students/unenroll", {
        studentId: student,
        courseId,
      });

      // Update the enrollments list to reflect the unenrollment
      setEnrollments(enrollments.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>My Enrollments</h2>
      <div className="list-group">
        {enrollments.map((course) => (
          <div
            key={course._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h4 className="mb-1">{course.title}</h4>
              <p className="mb-1">{course.description}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => unenroll(course._id)}
            >
              Unenroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollments;
