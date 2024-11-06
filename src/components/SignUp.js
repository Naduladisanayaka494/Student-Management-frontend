import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../components/SignUp";

const SignUp = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(null); // State to handle redirection

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Set profile picture file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      role === "student"
        ? "http://localhost:5000/api/students/register"
        : "http://localhost:5000/api/teachers/register";

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture); // Add profile picture to form data

    try {
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`Successfully registered as a ${role}!`);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePicture(null);

      // Set redirect path based on role
      setRedirect(role === "student" ? "/student-login" : "/teacher-login");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  // If redirect state is set, navigate to the specified login page
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center">Sign Up</div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
