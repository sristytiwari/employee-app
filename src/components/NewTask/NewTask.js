import Button from "react-bootstrap/Button";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Form, Nav, Navbar } from "react-bootstrap";
import "./style.css";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router";

export default function NewTask() {
  let history = useHistory();
  let formRef = useRef();
  const [alert, setAlert] = useState({
    variant: "",
    msg: "",
    showAlert: false,
  });

  let onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    addToDB(formDataObj);
  };
  let addToDB = (values) => {
    const taskRef = firebase.database().ref("Task");
    let tags = [];
    Object.entries(values).forEach((value, index) => {
      if (value[1] === "on") {
        tags.push(value[0]);
      }
    });
    let creationDate = new Date().toString();
    const task = {
      title: values.title,
      description: values.description,
      tags: tags,
      upvote: 0,
      creationDate: creationDate,
    };

    taskRef.push(task);
    setAlert({
      variant: "primary",
      msg: "Task Added",
      showAlert: true,
    });
    formRef.current.reset();
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert({
        variant: "",
        msg: "",
        showAlert: false,
      });
    }, 3000);
  }, [alert]);

  const tags = [
    "Technical",
    "Marketing",
    "Event",
    "Meeting",
    "Games",
    "Fun Activity",
  ];
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              history.push("/tasks");
            }}
          >
            Home
          </Nav.Link>
        </Nav>
        <Nav className="">
          <Nav.Link
            onClick={() => {
              history.push("/login");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      {alert.showAlert && (
        <Alert key="alert" variant={alert.variant}>
          {alert.msg}
        </Alert>
      )}
      <div className="task-container">
        <Form onSubmit={onSubmit} ref={formRef}>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Add Title" name="title" />
          </Form.Group>
          <Form.Group controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" />
          </Form.Group>
          <Form.Group controlId="tags" name="tags">
            <Form.Label>Tags</Form.Label>
            {tags.map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={`default-${type}`}
                  label={`${type}`}
                  name={type}
                />
              </div>
            ))}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
