import { useEffect, useState } from "react";
import { Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAppointment } from "../../Services/Appointment";
import Loader from "../Loader";

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const appointmentData = useSelector(state => state.AppointmentsReducer.Appointments);
    const [allAppointmentsData, setAllAppointmentsData] = useState({Data: null, isFetching: true})

    useEffect(() => {
        GetAllAppointment(dispatch)
    }, [])

    useEffect(() => {
        setTimeout(() => setAllAppointmentsData({Data: appointmentData, isFetching: false}), 500)
    }, [appointmentData])

    const handleSubmit = (event) => {
        event.preventDefault();

    }


    return allAppointmentsData.isFetching
    ?(<Loader />)
    :(
        <>
            <div className="container mt-5">
            <Row className="align-items-center mb-5">
                <h2 className="card-title">Applicant's Appointment Management</h2>
            </Row>
            <Row className="align-items-center mb-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">Appointment List <span className="text-muted fw-normal ms-2">({allAppointmentsData.Data.length})</span></h5>
                    </div>
                </div>

                <div className="col-md-6">
                    <form className="d-flex">
                        <input className="form-control mx-3" placeholder="Search by appointment ID"></input>
                        <button className="btn btn-primary">Search</button>
                    </form>
                </div>
            </Row>

            <Row>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Appointment ID</th>
                                    <th scope="col">IC Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Vaccination Centre</th>
                                    <th scope="col">Vaccination Choice</th>
                                    <th scope="col">2nd Dose Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allAppointmentsData.Data.map((data, index) => {

                                        return(
                                            <tr key={data.appointment_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{data.appointment_id}</td>
                                                <td>{data.ic}</td>
                                                <td>{data.name}</td>
                                                <td>{data.vaccCenter}</td>
                                                <td>{data.vaccChoice}</td>
                                                <td>{data.secondDoseDate != null ? data.secondDoseDate : 
                                                
                                                 <button className="btn btn-primary w-100" onClick={() => {
                                                    navigate('/AssignDate', {
                                                        state: {
                                                            id: data.appointment_id
                                                        }
                                                    })
                                                 }}>Assign Date</button>
                                                }</td>
                                            </tr>
                                        )
                                    })
                                    
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Row>
            
            </div>
        </>
    )
}