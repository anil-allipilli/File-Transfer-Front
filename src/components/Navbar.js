import React from 'react'
import { Link } from "react-router-dom";
import "../style/Navbar.css"

class Navbar extends React.Component {
    render() {

        let theNav
        if (this.props.loginStatus) {
            theNav = (<div className="Links">
                <Link className="Link" to="/about">About</Link>
                <Link onClick={this.props.logoutHandler} className="Link" to="/">Logout</Link>
            </div>)
        } else {
            theNav = (<div className="Links">
                <Link className="Link" to="/about">About</Link>
                <Link className="Link" to="/login">Login</Link>
                <Link className="Link" to="/register">Register</Link>
            </div>)
        }
        return (<div className="NavBar">
            <div className="Logo">
                <Link className="Link" to="/dashboard">File-Transfer</Link>
            </div>
            {theNav}
        </div>)
    }
}
export default Navbar