import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AssignAppointmentDate, GetSpeciAppointment } from "../../Services/Appointment";
import { Col, Row } from "react-bootstrap";

export default () => {
    const {state} = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const speciAppointData = useSelector(state => state.AppointmentsReducer.Appointment)
    const [speciAppointment, setSpeciAppointment] = useState({Data: null, isFetching: true});
    const [date, setDate] = useState(null)

    useEffect(() => {
        GetSpeciAppointment(dispatch, state.id);
    },[])

    useEffect(() => {
        setTimeout(() => setSpeciAppointment({Data: speciAppointData, isFetching: false}), 650)
    }, [speciAppointData])


    const handleChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
       const status = await AssignAppointmentDate(state.id, date)
       if(status == 200)
        {
            navigate('/ManageAppointmentStatus')
        }
    } 

    return speciAppointment.isFetching
    ? (<div className="mt-5 d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>)
    :(
        <div className="container mt-5">
            <Row >
                <h3 className="card-title">{speciAppointment.Data.name}'s Appointment Manager</h3>
            </Row>
            <div className="bg-light rounded h-50 mt-5 p-3">
            <Row className="mb-3">
                    <Col><h5 className="card-title">Appointment ID:</h5></Col>
                    <Col><p className="card-text">{speciAppointment.Data.appointment_id}</p></Col>
                </Row>

                <Row className="mb-3">
                    <Col><h5 className="card-title">Name:</h5></Col>
                    <Col><p className="card-text">{speciAppointment.Data.name}</p></Col>
                </Row>

                <Row className="mb-3">
                    <Col><h5 className="card-title">IC Number:</h5></Col>
                    <Col><p className="card-text">{speciAppointment.Data.ic}</p></Col>
                </Row>

                <Row className="mb-3">
                    <Col><h5 className="card-title">First Appointment Date:</h5></Col>
                    <Col><p className="card-text">{speciAppointment.Data.firstDoseDate}</p></Col>
                </Row>

                <Row className="mb-3">
                    <Col><h5 className="card-title">Second Appointment Date:</h5></Col>
                    <Col><p className="card-text">{speciAppointment.Data.secondDoseDate != null ? speciAppointment.Data.secondDosedate : 
                        <form className="d-flex" onSubmit={(event) => handleSubmit(event)}>
                            <input type="date" className="form-control mr-2" onChange={(event) => handleChange(event)} required></input>
                            <button className="btn btn-primary ml-2" type="submit">Assign</button>
                        </form>
                    }</p></Col>
                </Row>
                <Row>
                    <button className="btn btn-danger" onClick={() => navigate(-1)}>Back</button>
                </Row>

            </div>
        </div>
    )
}