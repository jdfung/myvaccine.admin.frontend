import axios from "axios"
import Cookies from "universal-cookie"
import { GetAuthHeader } from "./Login"
import { jwtDecode } from "jwt-decode"

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/AdminAuth/',
    headers: {
        'Access-Control-Allow-Origin' : '*', 
        'Authorization': `Bearer ${GetAuthHeader()}`
    }
})

export const UseRefreshToken = async () => {
    
    const cookies = new Cookies()
    const response = await axiosInstance.post('RefreshToken', null, {
        method: "post",
        withCredentials: true
    }).then((res) => {
        const decodedAccessToken = jwtDecode(res.data.accessToken);
        cookies.set("AccessToken", res.data.accessToken, {
            expires: new Date(decodedAccessToken.exp * 1000),
    })
        console.log(res.status)
        return res.status
    })
    .catch((err) => {
        console.log(err);
        return err.response.status
    })
    // console.log(response);
    // cookies.set("jwt_AccessAuthorization", response)
    return response;
}