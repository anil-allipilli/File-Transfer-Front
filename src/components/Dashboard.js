import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";


import refreshToken from "../refreshToken"
import api from "../axios"
import "../style/Dashboard.css"


const Dashboard = (props) => {

    const [sharedproducts, setSharedproducts] = useState([])
    const [myproducts, setMyproducts] = useState([])
    let history = useHistory()
    let res
    useEffect(() => {
        async function getProducts() {

            try {
                let token = localStorage.getItem("access")

                // eslint-disable-next-line
                res = await api.get(
                    `myproducts/`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                )
                setMyproducts(res.data)

            } catch (err) {

                if (err.response.status === 401) {
                    let refresh = await refreshToken()
                    if (!refresh) {
                        history.push("/login")
                    } else {
                        getProducts()
                    }
                }
            }
            try {
                let token = localStorage.getItem("access")
                // eslint-disable-next-line
                res = await api.get(
                    `sharedproducts/`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                )
                setSharedproducts(res.data)
            } catch (err) {

                if (err.response.status === 401) {
                    let refresh = await refreshToken()
                    if (!refresh) {
                        history.push("/login")
                    } else {
                        getProducts()
                    }
                }
            }
        }
        getProducts()
    }, [])


    return (
        <div className="DashBoardBox">
            <div className="Tab">
                <h1 className="Title">My Products</h1>
                {myproducts.map((product, i) => {
                    return (
                        <div key={i} className="Product">
                            <div onClick={() => history.push(`/productdetail/${product.id}`)}>{product.name}</div>
                        </div>
                    )
                })}
            </div>
            <div className="Tab">
                <h1 className="Title">Shared Products</h1>
                {sharedproducts.map((product, i) => {
                    return (
                        <div key={i} className="Product">
                            <div onClick={() => history.push(`/productdetail/${product.id}`)}>{product.name}</div>
                        </div>
                    )
                })}
            </div>
            <div className="Tab">
                <h1 onClick={() => history.push(`/productcreate`)} className="AddButton">Add Product</h1>

            </div>
        </div>
    )
}

export default Dashboard