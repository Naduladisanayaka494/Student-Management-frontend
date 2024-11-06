// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import StudentLogin from './components/student/StudentLogin';
import TeacherLogin from './components/teacher/TeacherLogin';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import './App.css';
import SignUp from './components/SignUp';
import MyCourses from './components/teacher/MyCourses';
import MyEnrollments from './components/student/MyEnrollements';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher/my-courses" element={<MyCourses />} />
          <Route path="/student/enrollments" element={<MyEnrollments />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
