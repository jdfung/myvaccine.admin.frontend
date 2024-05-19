import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate();
    return(
        <nav className="navbar navbar-light bg-light p-3">
            <div className="container-fluid mx-3">
                <button className="navbar-brand btn btn-link d-flex justify-content-start" onClick={() => {
                    navigate('/')
                }}>Admin Portal</button>
                <button className="d-flex justify-content-end btn btn-primary">Logout</button>
            </div>
        </nav>
    )
}