import { useNavigate } from "react-router-dom"
import { logout } from "../Services/Logout";

export default () => {
    const navigate = useNavigate();
    return(
        <nav className="navbar navbar-light bg-light p-3">
            <div className="container-fluid mx-3">
                <button className="navbar-brand btn btn-link d-flex justify-content-start" onClick={() => {
                    navigate('/HomePage')
                }}>Admin Portal</button>
                <button className="d-flex justify-content-end btn btn-primary" onClick={() => logout()}>Logout</button>
            </div>
        </nav>
    )
}