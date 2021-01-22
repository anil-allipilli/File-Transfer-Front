import api from "./axios"

const refreshToken = async () => {
    const refreshTokenFormData = new FormData()
    refreshTokenFormData.append("refresh", localStorage.getItem("refresh"))
    let res;
    try {
        res = await api({
            method: "post",
            url: "api/token/refresh/",
            data: refreshTokenFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        localStorage.setItem('access', res.data.access);
        if (res.status === 200) {
            return true
        }

    } catch (err) {
        if (err.response.status === 401) {
            return false
        }
    }
}

export default refreshToken