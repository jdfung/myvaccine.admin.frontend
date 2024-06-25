import Cookies from "universal-cookie"
import api from "../api/api";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/AdminAuth/'
})

export const logout = async () => {
    const cookies = new Cookies();
    await axiosInstance.post('Logout', null, {
        method: "post",
        withCredentials: true
    }).then(() => {
        cookies.remove("AccessToken");
        localStorage.removeItem("User");
        window.location.href = '/Login';
    }).catch((err) => {
        console.log(err)
    })

    
}