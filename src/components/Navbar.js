import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const token = localStorage.getItem("user"); // Check if token exists in localStorage

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-white font-weight-bold" to="/">
          <span role="img" aria-label="book">
            📘
          </span>{" "}
          Student Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Show these links if the user is a teacher */}
            {token && user && user.role === "teacher" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/teacher">
                    Teacher Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light"
                    to="/teacher/my-courses"
                  >
                    My Courses
                  </Link>
                </li>
              </>
            )}

            {/* Show these links if the user is a student */}
            {token && user && user.role === "student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/student">
                    Student Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light"
                    to="/student/enrollments"
                  >
                    My Enrollments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/student/homework">
                    My Homework
                  </Link>
                </li>
              </>
            )}

            {/* If the user is logged in, show Logout button */}
            {token ? (
              <li className="nav-item">
                <button className="btn btn-danger ml-2" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              // If no token (user is not logged in), show these links
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/sign-up">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/student-login">
                    Student Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/teacher-login">
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
