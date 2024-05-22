import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { GetAllStates, GetSpeciVaccCentre } from "../../Services/VaccCentre";
import { Col, Row } from "react-bootstrap";

export default () => {

    const { state } = useLocation()
    const dispatch = useDispatch();
    const [StateData, setStateData] = useState(null);

    useEffect(() => {
        GetSpeciVaccCentre(dispatch, state.id)
        setStateData(GetAllStates());
    }, [])

    useEffect(() => {
        console.log(StateData);
    }, [StateData])



    return(
        <div className="container mt-5">
            <form className="d-flex flex-column">
                <div className="form-group">
                    <label>Centre Name</label>
                    <input type="text" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input type="select" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>District</label>
                    <input type="select" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control"></textarea>
                </div>
            </form>
        </div>
    )
}