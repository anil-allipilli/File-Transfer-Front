import React from 'react'


import api from "../axios"


import "../style/Dashboard.css"

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sharedproducts: [],
            myproducts: []
        }
    }

    async componentDidMount() {

        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `myproducts/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            console.log(res)
            this.setState({
                ...this.state,
                myproducts: res.data,

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
        try {
            let token = localStorage.getItem("access")
            // eslint-disable-next-line
            let res = await api.get(
                `sharedproducts/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            )
            console.log(res)
            this.setState({
                ...this.state,
                sharedproducts: res.data,

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
            </div>
        )
    }
}

export default Dashboard

