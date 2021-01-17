import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

import api from "../axios"
import "../style/Login.css"
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    const loginHandler = async (e) => {
        e.preventDefault();
        const loginFormData = new FormData()
        loginFormData.append("email", email)
        loginFormData.append("password", password)
        let res;
        try {
            // eslint-disable-next-line
            res = await api({
                method: "post",
                url: "api/token/",
                data: loginFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            window.localStorage.clear();
            window.localStorage.setItem('access', res.data.access);
            window.localStorage.setItem('refresh', res.data.refresh);
            history.push("/dashboard")


        } catch (err) {
            console.log(err)
        }

    }
    return (
        <form className="LoginBox" onSubmit={loginHandler}>
            <label className="InputUnit" >
                <b className="Label">Email:</b>
                <input
                    className="Input"
                    type="text"
                    placeholder="Enter email"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
            </label>
            <label className="InputUnit" >
                <b className="Label">Password:</b>
                <input
                    className="Input"
                    type="password"
                    placeholder="Enter Password"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required></input>
            </label>

            <button className="LoginButton" type="submit">Login</button>
        </form>
    )
}

export default Login