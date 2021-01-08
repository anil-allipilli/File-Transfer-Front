import React from 'react'
import api from "../axios"

import "../style/ProductDetail.css"

class ProductDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            owner: "",
            name: "",
            product_users: [],
            product_files: []
        }

        console.log(this.props)

    }
    async componentDidMount() {
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `products/${this.props.match.params.id}/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            console.log(res)
            this.setState({
                owner: res.data.owner,
                name: res.data.name,
                product_users: res.data.product_users,
                product_files: res.data.product_files,

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

    async downloadFile(fileName) {
        console.log(fileName)
        try {
            let token = localStorage.getItem("access")
            let res = await api({
                method: "get",
                url: `media/files/${fileName}/`,
                headers: { 'Authorization': `Bearer ${token}` },
                responseType: 'blob'
            })

            const url = window.URL.createObjectURL(res.data)
            let a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();


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




    render() {
        return (
            <div className="ProductDetailBox">
                <h1>Owner of Product: {this.state.owner}</h1>
                <h1>Product Name: {this.state.name}</h1>
                <div>
                    {this.state.product_files.map((file, i) => {
                        let fileName = file.file.split("/").pop()
                        console.log(fileName)
                        return (
                            <div onClick={() => this.downloadFile(fileName)} key={i}>Filename: {fileName}</div>
                        )
                    })}
                </div>
                <div>
                    {this.state.product_users.map((user, i) => {
                        return (
                            <div key={i}>Product User: {user}</div>
                        )
                    })}
                </div>


            </div>

        )
    }
}

export default ProductDetail