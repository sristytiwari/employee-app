import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Form, Nav, Navbar } from "react-bootstrap";
import "./style.css";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router";
import { Alert } from "react-bootstrap";

export default function Login() {
  let history = useHistory();
  const [alert, setAlert] = useState({
    variant: "",
    msg: "",
    showAlert: false,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    checkToDB(formDataObj);
  };
  const checkToDB = (values) => {
    const userRef = firebase.database().ref("user");
    userRef.on("value", (user) => {
      Object.entries(user.val()).map((value, index) => {
        if (
          value[1].employeeId === values.employeeId &&
          value[1].password === values.password
        ) {
          history.push("/tasks");
        } else {
          setAlert({
            variant: "danger",
            msg: "Invalid Id/Password",
            showAlert: true,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
      </Navbar>
      {alert.showAlert && (
        <Alert key="alert" variant={alert.variant}>
          {alert.msg}
        </Alert>
      )}

      <div className="login-container">
        <div className="form-container">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                name="employeeId"
                required
              />
              <Form.Text className="text-muted">
                Employee ID contains 3 digit number
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
              Not Registered?
              <span className="signUp" onClick={() => history.push("/signup")}>
                Sign Up
              </span>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
}
