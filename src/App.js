import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewTask from "./components/NewTask/NewTask";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import Homepage from "./components/HomePage/Homepage";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login">
        <Login/></Route>
        <Route path="/signup">
        <Signup/></Route>
       
        <Route path="/create-task">
       
          <NewTask />
        </Route>
        <Route path="/tasks"><Homepage/></Route>
      </Switch>
    </Router>
  );
}

export default App;
