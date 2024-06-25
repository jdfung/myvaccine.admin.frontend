import { Row } from "react-bootstrap"
import { GetAllApplicants, GetApplicantByIC } from "../../Services/Applicant"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default ({Token}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const applicantData = useSelector(state => state.ApplicantsReducer.Applicants);
    const [allApplicantData, setAllApplicantData] = useState({Data: null, isFetching: true})
    const [searchFrom, setSearchForm] = useState("");

    useEffect(() => {
        GetAllApplicants(dispatch);
    }, [])

    useEffect(() => {
        setTimeout(() => setAllApplicantData({Data: applicantData, isFetching: false}), 500)
    }, [applicantData])
    
    const handleManage = (id) => {
        
        setAllApplicantData((prev) => ({
            ...prev,
            isFetching: true
        }))
        
        navigate('/EditApplicantStatus', {
            state: {
                id: id
            }
        })
        
    }

    const handleSearchChange = (e) => {
        var value = e.target.value;
        setSearchForm(value)
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const status = await GetApplicantByIC(dispatch, searchFrom);
        if(status == 200)
            {
                console.log("here");
            }
        else
        {
            alert("IC number not found");
        }
    }
        

    return allApplicantData.isFetching
    ?(  <div className="mt-5 d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
    
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
                    <form className="d-flex" onSubmit={(e) => handleSearchSubmit(e)}>
                        <input className="form-control mx-3" type="number" maxLength="12" placeholder="Search by IC" onChange={(e) => handleSearchChange(e)}></input>
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
                                            <tr key={data.applicant_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{data.ic}</td>
                                                <td>{data.name}</td>
                                                <td>{data.firstDose ? <input type="checkbox" checked="checked" readOnly></input> : <input type="checkbox" disabled="disabled" readOnly></input>}</td>
                                                <td>{data.secondDose? <input type="checkbox" checked="checked" readOnly></input> : <input type="checkbox" disabled="disabled" readOnly></input>}</td>
                                                <td><button className="btn btn-primary" onClick={() => handleManage(data.applicant_id)}>Update</button></td>
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
