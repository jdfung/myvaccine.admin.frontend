import { Navigate, Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import { GetAuthHeader } from "../Services/Login"
import { useAuth } from "../Services/AuthContext";


export default () => {
    const {user, loading}  = useAuth();
    
    if(loading)
        {
            return(
                <div>Loading....</div>
            )
        }

    return <div>
        <NavBar />
        {user? <Outlet /> : <Navigate to="/Login" />}
    </div>

}