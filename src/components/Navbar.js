import React from "react";
import { Link } from "react-router-dom";

import "../style/Navbar.css"

function Navbar() {
  let theNav = <div className="Links">
    <Link className="Link" to="/about">About</Link>
    <Link className="Link" to="/login">Login</Link>
    <Link className="Link" to="/register">Register</Link>
  </div>
  const logoutHandler = () => {
    localStorage.clear();
  }
  if (localStorage.getItem("access")) {
    theNav = (<div className="Links">
      <Link className="Link" to="/about">About</Link>
      <Link onClick={logoutHandler} className="Link" to="/">Logout</Link>
    </div>)
  }
  return (
    <div className="NavBar">
      <div className="Logo">
        <Link className="Link" to="/dashboard">File-Transfer</Link>
      </div>
      {theNav}
    </div>
  );


}

export default Navbar;