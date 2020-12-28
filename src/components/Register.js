import React, {useState} from 'react'

import api from "../axios"
import { useHistory } from "react-router-dom";
import "../style/Register.css"

const Register = (props) => {

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [companyName, setCompanyName] = useState("");

    let history = useHistory();
    const registerHandler = async (e) => {
        if(password !== confirmpassword) return false
        e.preventDefault()
        const registerFormData = new FormData()

        registerFormData.append("password", password)

        registerFormData.append("first_name", firstName)
        registerFormData.append("last_name", lastName)
        registerFormData.append("email", email)

        registerFormData.append("phone_number", phone)
        registerFormData.append("company_logo", companyLogo)
        registerFormData.append("company_name", companyName)

        let res;
        try {
            // eslint-disable-next-line
            res = await api({
                method: "post",
                url: "accounts/",
                data: registerFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            console.log(res)
            history.push("/login")
        } catch (err) {
            console.log(err)
        }
        console.log(res)
    }

    return (
        <form className="RegisterSponseeBox" onSubmit={registerHandler}>

            <label className="RegisterUnit">
                <b className="RegisterLabel">First Name</b>
                <input 
                className="RegisterInput"type="text" 
                    placeholder="Enter first name" 
 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Last Name</b>
                <input 
                className="RegisterInput"type="text" 
                    placeholder="Enter last name" 

                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required
                ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Password</b>
                <input 
                className="RegisterInput"
                    type="password" 
                    placeholder="Enter Password" 

                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Confirm Password</b>
                <input 
                className="RegisterInput"
                    type="password" 
                    placeholder="Confirm Password" 
 
                    value={confirmpassword} 
                    onChange={(e) => setConfirmpassword(e.target.value)} 
                    required
                ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Email</b>
                <input 
                className="RegisterInput"type="email" 
                placeholder="Enter email" 
             
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                ></input>            
            </label>



            <label className="RegisterUnit">
                <b className="RegisterLabel">Phone</b>
                <input 
                className="RegisterInput"type="number" 
                placeholder="Enter phone" 
             
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
                ></input>
            </label>
            <label className="RegisterUnit">
                <b className="RegisterLabel">Company Name</b>
                <input 
                className="RegisterInput" type="text" 
                    placeholder="Enter company name" 

                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    required
                ></input>
            </label>

            <label className="RegisterUnit">
                <b className="RegisterLabel">Company logo</b>
                <input 
                className="RegisterInput"
                type="file" 

                onChange={(e) => setCompanyLogo(e.target.files[0])}  
                required
            ></input>
            </label>




            <button className="RegisterButton"  type="submit">Register</button>            
        </form>
    )
}

export default Register