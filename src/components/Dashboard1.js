import React from 'react'


import api from "../axios"
import refreshToken from "../refreshToken"

import "../style/Dashboard.css"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sharedproducts: [],
            myproducts: []
        }
        this.getProducts = this.getProducts.bind(this);

    }
    async getProducts() {

        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `myproducts/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )

            this.setState({
                ...this.state,
                myproducts: res.data,

            })

        } catch (err) {

            if (err.response.status === 401) {
                let refresh = await refreshToken()
                if (!refresh) {
                    this.props.history.push("/login")
                } else {
                    this.getProducts()
                }
            }
        }
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `sharedproducts/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )

            this.setState({
                ...this.state,
                sharedproducts: res.data,

            })

        } catch (err) {

            if (err.response.status === 401) {
                let refresh = await refreshToken()
                if (!refresh) {
                    this.props.history.push("/login")
                } else {
                    this.getProducts()
                }
            }
        }
    }

    componentDidMount() {


        this.getProducts()
    }

    render() {

        return (
            <div className="DashBoardBox">
                <div className="Tab">
                    <h1 className="Title">My Products</h1>
                    {this.state.myproducts.map((product, i) => {
                        return (
                            <div key={i} className="Product">
                                <div onClick={() => this.props.history.push(`/productdetail/${product.id}`)}>{product.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="Tab">
                    <h1 className="Title">Shared Products</h1>
                    {this.state.sharedproducts.map((product, i) => {
                        return (
                            <div key={i} className="Product">
                                <div onClick={() => this.props.history.push(`/productdetail/${product.id}`)}>{product.name}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="Tab">
                    <h1 onClick={() => this.props.history.push(`/productcreate`)} className="AddButton">Add Product</h1>

                </div>
            </div>
        )
    }
}

export default Dashboard

