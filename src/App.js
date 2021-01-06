import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import ProductCreate from "./components/ProductCreate"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/productcreate"><ProductCreate /></Route>
          <Route path="/"><Login /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
