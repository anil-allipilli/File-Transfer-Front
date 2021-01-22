import React from 'react'


import api from "../axios"
import "../style/ProductDetail.css"
import refreshToken from "../refreshToken"


class ProductDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            owner: "",
            name: "",
            product_users: [],
            product_files: []
        }
        this.getProductDetail = this.getProductDetail.bind(this);
    }

    async getProductDetail() {
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `products/${this.props.match.params.id}/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            this.setState({
                owner: res.data.owner,
                name: res.data.name,
                product_users: res.data.product_users,
                product_files: res.data.product_files,
            })
        } catch (err) {
            if (err.response.status === 401) {
                let refresh = await refreshToken()
                if (!refresh) {
                    this.props.history.push("/login")
                } else {
                    this.getProductDetail()
                }
            }
        }
    }

    async componentDidMount() {
        this.getProductDetail()
    }

    async downloadFile(fileName) {
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
            if (err.response.status === 401) {
                let refresh = await refreshToken()
                if (!refresh) {
                    this.props.history.push("/login")
                } else {
                    this.downloadFile(fileName)
                }
            }
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