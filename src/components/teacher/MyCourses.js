import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import
import CourseEditModal from "./CourseEditModal";
import { useAuth } from "../../context/AuthContext";
import { Modal, Form, Button } from "react-bootstrap";

const MyCourses = () => {
  const token = localStorage.getItem("user");
  const decodedToken = jwtDecode(token);
  const teacherId = decodedToken.id;

  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // New state for selected course ID
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddHomeworkModal, setShowAddHomeworkModal] = useState(false);
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [homeworkDueDate, setHomeworkDueDate] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teachers/my-courses/${teacherId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
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
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleOpenAddHomeworkModal = (courseId) => {
    setSelectedCourseId(courseId); // Set selected course ID
    setShowAddHomeworkModal(true);
  };

  const handleCloseAddHomeworkModal = () => {
    setShowAddHomeworkModal(false);
  };

  const handleAddHomework = async () => {
    const newHomework = {
      title: homeworkTitle,
      description: homeworkDescription,
      dueDate: homeworkDueDate,
      courseId: selectedCourseId,
      teacherId: teacherId,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/teachers/add-homework",
        newHomework
      );
      handleCloseAddHomeworkModal();
    } catch (error) {
      console.error("Error adding homework:", error);
    }
  };

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(
      courses.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
  };

  return (
    <div className="container my-5">
      <h2>Courses Created by You</h2>
      <div className="list-group">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="list-group-item">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <div className="d-flex justify-content-end">
                {/* <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button> */}
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success ml-2"
                  onClick={() => handleOpenAddHomeworkModal(course._id)}
                >
                  Add Homework
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>

      {selectedCourse && (
        <CourseEditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          course={selectedCourse}
          onUpdate={handleUpdateCourse}
        />
      )}

      <Modal show={showAddHomeworkModal} onHide={handleCloseAddHomeworkModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Homework</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHomeworkTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter homework title"
                value={homeworkTitle}
                onChange={(e) => setHomeworkTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formHomeworkDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter homework description"
                rows={3}
                value={homeworkDescription}
                onChange={(e) => setHomeworkDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formHomeworkDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={homeworkDueDate}
                onChange={(e) => setHomeworkDueDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddHomeworkModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddHomework}>
            Add Homework
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCourses;
