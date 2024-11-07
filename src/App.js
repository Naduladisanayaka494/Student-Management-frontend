import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import StudentLogin from "./components/student/StudentLogin";
import TeacherLogin from "./components/teacher/TeacherLogin";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import "./App.css";
import SignUp from "./components/SignUp";
import MyCourses from "./components/teacher/MyCourses";
import MyEnrollments from "./components/student/MyEnrollements";
import StudentHomework from "./components/student/StudentHomework";
// PrivateRoute component that checks if the token exists
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("user"); // Check if token is in localStorage
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/student-login" />;
  }
  return children; // If token exists, render the protected route
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />

          {/* Protected Routes */}
          <Route
            path="/teacher"
            element={
              <PrivateRoute>
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/homework"
            element={
              <PrivateRoute>
                <StudentHomework />
              </PrivateRoute>
            }
          />

          <Route
            path="/student"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/my-courses"
            element={
              <PrivateRoute>
                <MyCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/enrollments"
            element={
              <PrivateRoute>
                <MyEnrollments />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
