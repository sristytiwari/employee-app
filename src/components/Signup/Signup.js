import React from "react";
import Button from "react-bootstrap/Button";
import { Form, Navbar } from "react-bootstrap";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router";

export default function Signup() {
  let history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    saveToDB(formDataObj);
  };
  const saveToDB = (values) => {
    const userRef = firebase.database().ref("user");

    const user = values;
    userRef.push(user);
    history.push("/tasks");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
      </Navbar>

      <div className="login-container">
        <div className="form-container">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="empName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="employeeName"
              />
            </Form.Group>
            <Form.Group controlId="empEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="employeeEmail"
                required
              />
            </Form.Group>
            <Form.Group controlId="empId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                name="employeeId"
                required
              />
              <Form.Text className="text-muted">
                Employee ID containes 3 digit number
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Text className="text-muted">
              Already Registered?
              <span className="signUp" onClick={() => history.push("/login")}>
                Login
              </span>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
}
