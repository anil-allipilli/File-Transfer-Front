import React from 'react'
import api from "../axios"

import "../style/ProductCreate.css"

class ProductCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            productName: "",
            selectedUsersList: [],
            filesList: ""
        }


        this.history = this.props.history




        // this.history = useHistory();
        this.filesUploadHandler = this.filesUploadHandler.bind(this);
    }
    async componentDidMount() {
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                "accounts/",
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            console.log(res)
            this.setState(state => {
                return {
                    ...state,
                    users: res.data
                }
            })
        } catch (err) {
            console.log(err)
            // if(err.response.status === 401) {
            //     let refresh = await refreshToken()
            //     if(!refresh) {
            //         history.push("/login")
            //     } else {
            //         fetchdata()
            //     }
            // }
        }


    }


    async filesUploadHandler(e) {
        e.preventDefault();
        const fileShareData = new FormData()
        fileShareData.append("productName", this.state.productName)

        for (let i = 0; i < this.state.selectedUsersList.length; i++) {
            fileShareData.append(`users[${i}]`, this.state.selectedUsersList[i])
        }
        for (let i = 0; i < this.state.filesList.length; i++) {
            fileShareData.append(`files[${i}]`, this.state.filesList[i])
        }

        let res;
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            res = await api({
                method: "post",
                url: "createproduct/",
                data: fileShareData,
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
            })
        } catch (err) {
            console.log(err)
        }
        // console.log(history)
        console.log(res.data)
        this.history.replace(`/productdetail/${res.data.id}`);
    }
    removeOrAdd(userEmail) {
        if (this.state.selectedUsersList.includes(userEmail)) {
            this.setState({
                ...this.state,
                selectedUsersList: this.state.selectedUsersList.filter(email => email !== userEmail)
            })
        }
        else {
            this.setState({
                ...this.state,
                selectedUsersList: this.state.selectedUsersList.concat(userEmail)
            })
        }
    }

    render() {

        return (
            <form className="ProductUploadBox" onSubmit={this.filesUploadHandler}>
                <label className="InputUnit" >
                    <b className="Label">Product Name:</b>
                    <input
                        className="Input"
                        type="text"
                        placeholder="Enter product name"

                        value={this.state.productName}
                        onChange={(e) => this.setState(state => ({ ...state, productName: e.target.value }))}
                        required
                    ></input>
                </label>
                <table  >
                    <thead className="TableUnit" >
                        <tr className="TableRow" >
                            <th>Select</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className="TableUnit">
                        {this.state.users.map((user, i) => {

                            return (
                                <tr
                                    key={i}
                                    className="TableRow"
                                    onClick={() => this.removeOrAdd(user.email)}
                                    style={{ color: this.state.selectedUsersList.includes(user.email) ? 'blue' : 'red' }}
                                >
                                    <td>Select</td>
                                    <td>{user.first_name + " " + user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.company_name}</td>
                                    <td>{user.phone_number}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

                <label className="InputUnit" >
                    <b className="Label">Files:</b>
                    <input
                        className="Input"
                        type="file"
                        placeholder="Enter "
                        multiple

                        onChange={(e) => this.setState(state => ({ ...state, filesList: e.target.files }))}
                        required></input>
                </label>

                <button className="UploadButton" type="submit">Upload</button>
            </form>

        )
    }
}

export default ProductCreate