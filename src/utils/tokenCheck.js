// import React, { useState, useEffect } from 'react'

// function getToken() {
//     const token = window.localStorage.getItem("access")
//     if (token === null) return false
//     return true
// }
// const tokenCheck = () => {
//     const [loggedInStatus, setLoggedInStatus] = useState(getToken())

//     useEffect(() => {
//         function handleLoginStatus() {
//             console.log("hello")
//             setLoggedInStatus(getToken())
//         }
//         window.addEventListener("storage", handleLoginStatus)
//         return () => window.removeEventListener("storage", handleLoginStatus)
//     }, [])
//     return loggedInStatus
// }
// export default tokenCheck