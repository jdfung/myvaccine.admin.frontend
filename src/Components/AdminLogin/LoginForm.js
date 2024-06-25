import { Card } from "react-bootstrap"
import { GetAuthHeader, LoginAdmin } from "../../Services/Login";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Services/AuthContext";

export default ({ setLoginToken }) => {
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await LoginAdmin(formData.username, formData.password)
        if (status == 200) {
            setUser(formData.username);
            // console.log(GetAuthHeader());
            navigate('/HomePage')
        }
        else {
            console.log("Wrong login info")
        }

    }

    return (
        <div className="container mt-5">
            <h2 className="card-title  text-center">Admin Portal</h2>
            <Card className="p-3 mt-5 rounded">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Username: </label>
                        <input className="form-control mt-2" id="username" type="text" placeholder="E.g: Admin" name="username" onChange={(e) => handleChange(e)} required></input>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password: </label>
                        <input className="form-control mt-2" id="password" type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} required></input>
                    </div>

                    <div className="form-group text-center mb-3">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}