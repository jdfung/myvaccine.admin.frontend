import { useEffect } from "react"
import { GetAllVaccCentres } from "../../Services/VaccCentre"
import { useDispatch } from "react-redux"
import { Col, Row } from "react-bootstrap";

export default () => {

    const dispatch = useDispatch();

    useEffect(() => {
        GetAllVaccCentres(dispatch)
    }, [])

    return(
        <div className="container mt-5">
            <Row className="align-items-center mb-5">
                <h2 className="card-title">
                    Vaccination Spots Management
                </h2>
            </Row>
            <Row className="align-items-center mb-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">Vaccination Centres List <span className="text-muted fw-normal ms-2">()</span></h5>
                    </div>
                </div>
            </Row>
            <Row className="mb-3">
                <div className="d-flex w-75">
                    <form className="d-flex flex-fill">
                        <input className="form-control mr-3" placeholder="Search by ID"></input>
                        <button className="btn btn-primary mx-2">Search</button>
                    </form>
                    <button className="btn btn-success">Add</button>
                </div>
            </Row>
            <Row>
            <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Centre ID</th>
                                    <th scope="col">Centre Name</th>
                                    <th scope="col">State</th>
                                    <th scope="col">District</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </Row>
        </div>
    )
}