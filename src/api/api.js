import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UseRefreshToken } from "../Services/UserRefreshToken";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

const api = axios.create({
    baseURL: 'https://localhost:7015/',
    withCredentials: true
})

api.interceptors.request.use(config => {
    const token = cookies.get('AccessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

api.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
            const response = await axios.post('https://localhost:7015/AdminAuth/RefreshToken', {}, {withCredentials: true})
            
            //axios.post('https://localhost:7015/AdminAuth/RefreshToken', {}, { withCredentials: true })
            const {accessToken}  = response.data;
            const decodedAccessToken = jwtDecode(accessToken);
            cookies.set("AccessToken", accessToken, {
                expires: new Date(decodedAccessToken.exp * 1000),
        })
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest)   
        } catch (error) {
            console.error("Refresh token expired", error);
            cookies.remove("User")
            window.location.href = '/Login';
        }
    }
    return Promise.reject(error);
})

export default api;