import axios from "axios";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const cookies = new Cookies();

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/AdminAuth',
})

export const LoginAdmin = async (username, password) => {

    const status = await axiosInstance.post('Login', null, {
        params: {
            username,
            password
        },
        method: "post",
        withCredentials: true
    })
    .then((res) => {
        console.log(res.data)
        const decodedAccessToken = jwtDecode(res.data.accessToken)
        cookies.set("AccessToken", res.data.accessToken, {
                expires: new Date(decodedAccessToken.exp * 1000),
        });
        // cookies.set("User", username);
        
        localStorage.setItem("User", username)
        // localStorage.setItem("RefreshToken", res.data[1])
        
        return res.status;
    }).catch((err) => {
        console.log(err)
        return err.response;
        
    })

    return status
}

export const GetAuthHeader = () => {
    const user = cookies.get("AccessToken")

    if(user)
        {
            return user;
        }
    else{
        return
    }

}

export const VerifyToken = (Token) => {
    try {
        return jwtDecode(Token)
    } catch (error) {
        return error.status
    }
}

export const removeToken = () => {
     cookies.remove("AccessToken");
}