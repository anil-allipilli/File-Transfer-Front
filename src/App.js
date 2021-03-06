import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";

import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import ProductCreate from "./components/ProductCreate"
import ProductDetail from "./components/ProductDetail"
import Dashboard from "./components/Dashboard"

function App() {

  const checkLoginStatus = () => {
    const token = window.localStorage.getItem("access")
    if (token === null) return false
    return true
  }
  const [authenticated, setAuthenticated] = useState(checkLoginStatus())
  const logoutHandler = () => {
    localStorage.clear();
    setAuthenticated(false)
  }


  return (
    <Router forceRefresh={true} >
      <Navbar loginStatus={authenticated} logoutHandler={logoutHandler} />
      <div className="App">
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/productcreate" render={(routeProps) => {
            if (authenticated) {
              return <ProductCreate {...routeProps} />
            } else {
              return <Redirect to="/login" />
            }
          }} />


          <Route path="/productdetail/:id" render={(routeProps) => {
            if (authenticated) {
              return <ProductDetail {...routeProps} />
            } else {
              return <Redirect to="/login" />
            }
          }} />


          <Route path="/dashboard"
            render={(routeProps) => {
              if (authenticated) {
                return <Dashboard {...routeProps} />
              } else {
                return <Redirect to="/login" />
              }
            }}
          />



          <Route path="/"
            render={(routeProps) => {
              if (authenticated) {
                return <Redirect to="/dashboard" />
              } else {
                return <Redirect to="/login" />
              }
            }}
          />


        </Switch>
      </div>
    </Router>
  );
}

export default App;
