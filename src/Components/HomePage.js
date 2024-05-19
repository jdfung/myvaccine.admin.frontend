import { useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

export default () => {
    const [selection, setSelection] = useState(1);
    const navigate = useNavigate()

    return(
        <>

            <div className="card-group h-50">
                <div className="card">
                    <div className="card-img-top d-flex mt-3 mb-3">
                        <i className="bi bi-bandaid m-auto text-primary h1"></i>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center  text-center">
                        <div className="p-2 flex-fill">
                            <h3 className="card-title">Manage Applicant's Vaccination Status</h3>
                        </div>
                        <div className="p-2 flex-fill">
                            <p className="card-text">Manage registered applicant's vaccination dose status</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <button className="btn btn-primary" onClick={() => {
                                navigate('/ManageApplicantStatus')
                            }}>Manage</button>
                        </div>

                    </div>
                </div>

                <div className="card">
                    <div className="card-img-top d-flex mt-3 mb-3">
                        <i className="bi bi-calendar-date m-auto text-primary h1"></i>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center  text-center">
                        <div className="p-2 flex-fill">
                            <h3 className="card-title">Manage Applicant's Appointments</h3>
                        </div>
                        <div className="p-2 flex-fill">
                            <p className="card-text">Manage registered applicant's appointment dates and venue</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <button className="btn btn-primary" onClick={() => {
                                navigate('/ManageAppointmentStatus')
                            }}>Manage</button>
                        </div>

                    </div>
                </div>

                <div className="card">
                    <div className="card-img-top d-flex mt-3 mb-3">
                        <i className="bi bi-hospital m-auto text-primary h1"></i>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center  text-center">
                        <div className="p-2 flex-fill">
                            <h3 className="card-title">Manage Vaccination Spots</h3>
                        </div>
                        <div className="p-2 flex-fill">
                            <p className="card-text">Manage Available Vaccination Venue by their States, Districts, and Centres</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <button className="btn btn-primary" onClick={() => {
                                navigate('/ManageVaccSpots')
                            }}>Manage</button>
                        </div>

                    </div>
                </div>
                

            </div>
        </>
    )
}