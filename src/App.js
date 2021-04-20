import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewTask from "./components/NewTask/NewTask";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import Homepage from "./components/HomePage/Homepage";
import Signup from "./components/Signup/Signup";
import { useEffect} from "react";

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') || false;
 
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {" "}
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/create-task">
         
             <NewTask />  
         
        </Route>
        <Route exact path="/tasks">
         <Homepage />  
         
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
