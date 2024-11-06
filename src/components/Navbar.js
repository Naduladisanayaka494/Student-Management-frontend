// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Student Management System
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user && user.role === "teacher" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher">
                    Teacher Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher/my-courses">
                    Courses{" "}
                  </Link>
                </li>
              </>
            )}
            {user && user.role === "student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student">
                    Student Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/enrollments">
                    My Enrollments
                  </Link>
                </li>
              </>
            )}

            {user ? (
              <li className="nav-item">
                <button className="btn btn-danger ml-2" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student-login">
                    Student Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teacher-login">
                    Teacher Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
