import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";
import "./style.css";
import moment from "moment";
import { Alert } from "react-bootstrap";

export default function Homepage() {
  let history = useHistory();
  const [tasks, setTasks] = useState(false);
  const [alert, setAlert] = useState({
    variant: "",
    msg: "",
    showAlert: false,
  });

  useEffect(() => {
    const taskRef = firebase.database().ref("Task");
    taskRef.on("value", (tasks) => {
      let Obj = {};
      Object.entries(tasks.val()).map((value, index) => {
        value[1]["shouldUpvote"] = false;
        return (Obj[value[0]] = value[1]);
      });

      setTasks(Obj);
    });
  }, []);

  const upvoteTask = (selectedTask) => {
    const taskRef = firebase.database().ref("Task").child(selectedTask[0]);
    taskRef.update({
      upvote: selectedTask[1].upvote + 1,
    });

    let updatedObj = {
      ...selectedTask[1],
      shouldUpvote: true,
      upvote: selectedTask[1].upvote + 1,
    };
    let newObj = {
      [selectedTask[0]]: updatedObj,
    };
    setTasks({ ...tasks, ...newObj });
  };

  const setSort = (type) => {
    let sortedArray = Object.entries(tasks).sort((a, b) => {
      if (type === "date") {
        return   new Date(b[1].creationDate) - new Date(a[1].creationDate);
      } else {
        return   b[1].upvote - a[1].upvote;
      }
    });

    let sortedObj = {};
    sortedArray.forEach((item) => {
      sortedObj[item[0]] = item[1];
    });
    setTasks(sortedObj);
  };
  useEffect(() => {
    setTimeout(() => {
      setAlert({
        variant: "",
        msg: "",
        showAlert: false,
      });
    }, 5000);
  }, [alert]);

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              history.push("/create-task");
            }}
          >
            Create Task
          </Nav.Link>
        </Nav>
        <Nav className="">
          <Nav.Link
            onClick={() => {
              history.push("/login");
              localStorage.setItem("loggedIn", false)
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
      <div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Creation Date</th>
              <th>Task Name</th>
              <th>Tags</th>

              <th>Upvote</th>
              <th>Action</th>
            </tr>
          </thead>

          {tasks &&
            Object.entries(tasks).map((task, index) => {
              let dateString = moment(new Date(task[1].creationDate)).format(
                "DD MMM, YY"
              );

              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>

                    <td>{dateString}</td>
                    <td>{task[1].title}</td>
                    <td>{task[1].tags.toString()}</td>
                    <td>{task[1].upvote}</td>
                    <td>
                      {" "}
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (!task[1].shouldUpvote) {
                            upvoteTask(task);
                          } else {
                            setAlert({
                              variant: "primary",
                              msg: "Already Upvoted",
                              showAlert: true,
                            });
                          }
                        }}
                      >
                        Upvote
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </div>
      <div className="btn-container">
        <div className="btn-wrapper">
          <Button
            variant="primary"
            onClick={() => {
              setSort("date");
            }}
          >
            Sort By Date
          </Button>
        </div>
        <div className="btn-wrapper">
          <Button
            variant="primary"
            onClick={() => {
              setSort("upvote");
            }}
          >
            Sort By Upvote
          </Button>
        </div>
      </div>
    </div>
  );
}
