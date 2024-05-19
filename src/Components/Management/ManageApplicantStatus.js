import { Row } from "react-bootstrap"
import { GetAllApplicants } from "../../Services/Applicant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default () => {

    const dispatch = useDispatch();
    const applicantData = useSelector(state => state.ApplicantsReducer.Applicants);
    const [allApplicantData, setAllApplicantData] = useState({Data: null, isFetching: true})

    useEffect(() => {
        GetAllApplicants(dispatch);
    }, [])

    useEffect(() => {
        setAllApplicantData({Data: applicantData, isFetching: false})
        
    }, [applicantData])
    

    return allApplicantData.isFetching
    ?(<div><h1>Loading</h1></div>)
    
    :(
        <div className="container mt-5">
            
            <Row className="align-items-center mb-5">
                <h2 className="card-title">Applicants and Vaccination Record Management</h2>
            </Row>
            <Row className="align-items-center mb-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">Applicants List <span className="text-muted fw-normal ms-2">({allApplicantData.Data.length})</span></h5>
                    </div>
                </div>

                <div className="col-md-6">
                    <form className="d-flex">
                        <input className="form-control mx-3" placeholder="Search by IC"></input>
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
                                    <th scope="col">IC Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">1st Dose</th>
                                    <th scope="col">2nd Dose</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allApplicantData.Data.map((data, index) => {
                                        
                                        return(
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{data.ic}</td>
                                                <td>{data.name}</td>
                                                <td>{data.firstDose ? <input type="checkbox" checked="checked"></input> : <input type="checkbox" disabled="disabled"></input>}</td>
                                                <td>{data.secondDose? <input type="checkbox" disabled="disabled" checked="checked"></input> : <input type="checkbox" disabled="disabled"></input>}</td>
                                                <td><button className="btn btn-primary">Update</button></td>
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
    )
}
