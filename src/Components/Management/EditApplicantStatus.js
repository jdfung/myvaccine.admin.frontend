import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { EditApplicantStatus, GetSpecificApplicants } from "../../Services/Applicant";

export default () => {

    const {state} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const speciAppliData = useSelector(state => state.ApplicantsReducer.Applicant)
    const [speciApplicants, setSpeciApplicants] = useState({Data: null, isFetching: true});
    var [formValues, setFormValues] = useState(null);

    useEffect(() => {
        GetSpecificApplicants(dispatch, state.id)
    }, [])

    useEffect(() => {
        setSpeciApplicants({Data: speciAppliData, isFetching: false});
    }, [speciAppliData])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value == 'on' ? true : false;
        setFormValues({
            ...speciApplicants.Data,
            [name] : value
        })
    }

    const handleEdit = async (event) => {
        event.preventDefault();
        const status = await EditApplicantStatus(formValues)
        if(status == 200)
            {
                navigate('/ManageApplicantStatus');
            }
        // console.log(speciApplicants.Data)
    }

    return speciApplicants.isFetching
    ? (<div class="spinner-border m-5" role="status">
    <span class="sr-only"></span>
  </div>)
    : (
        <>
            <div className="container mt-5">
                <Row >
                    <h3 className="card-title">{speciApplicants.Data.name}'s Vaccination Status Manager</h3>
                </Row>
                <div className="bg-light rounded h-50 mt-5 p-3">
                    <Row className="mb-3">
                        <Col><h5 className="card-title">IC Number:</h5> </Col>
                        <Col><p className="card-text">{speciApplicants.Data.ic}</p></Col>
                    </Row>
                    <Row className="mb-3">
                        <Col><h5 className="card-title">Name:</h5> </Col>
                        <Col><p className="card-text">{speciApplicants.Data.name}</p></Col>
                    </Row>
                    <form onSubmit={handleEdit}>
                        <Row className="mb-3">
                            <Col><h5 className="card-title">First Dose:</h5> </Col>
                            <Col>{speciApplicants.Data.firstDose ? <input type="checkbox" className="form-check-input" onChange={handleChange} checked></input> : <input type="checkbox" name="firstDose" onChange={handleChange} className="form-check-input"></input>}</Col>
                        </Row>
                        <Row className="mb-3">
                            <Col><h5 className="card-title">Second Dose:</h5> </Col>
                            <Col>{speciApplicants.Data.secondDose ? <input type="checkbox" className="form-check-input" onChange={handleChange} checked></input> : <input type="checkbox" name="secondDose" onChange={handleChange} className="form-check-input"></input>}</Col>
                        </Row>
                        <Row>
                            <button className="btn btn-primary" type="submit">Edit</button>
                        </Row>
                        
                    </form>
                        <Row>
                            <button className="btn btn-danger" onClick={() => navigate(-1)}>Cancel</button>
                        </Row>
                </div>
            </div>
        </>
    )
    
}

