import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { GetAllDistricts, GetAllStates, GetSpeciVaccCentre, UpdateVaccCentre } from "../../Services/VaccCentre";
import { Col, Row } from "react-bootstrap";
import Loader from "../Loader";

export default () => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const speciVaccCentre = useSelector(state => state.VaccCentreReducer.SpeciVaccCentre);
    const AllStates = useSelector(state => state.VaccCentreReducer.States)
    const AllDistricts = useSelector(state => state.VaccCentreReducer.Districts)
    const [vaccCentreData, setVaccCentreData] = useState({ Data: null, isFetching: true })
    const [StateData, setStateData] = useState({ Data: null, isFetching: true });
    const [Districts, setDistricts] = useState({ Data: null, isFetching: true });
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        GetSpeciVaccCentre(dispatch, state.id)
        GetAllStates(dispatch)
    }, [])

    useEffect(() => {
        setStateData({ Data: AllStates, isFetching: false })
        setVaccCentreData({ Data: speciVaccCentre, isFetching: false })
        setFormData(speciVaccCentre)
    }, [AllStates, speciVaccCentre])

    const handleDistricts = async (event) => {
        var value = null;
        if (event.target.value.toLowerCase() == 'kuala lumpur') {
            value = 'kuala_lumpur';
        }
        else if (event.target.value.toLowerCase() == 'negeri sembilan') {
            value = 'negeri_sembilan'
        }
        else {
            value = event.target.value.toLowerCase();
        }
        setDistricts((prev) => ({ ...prev, isFetching: true }))
        await GetAllDistricts(dispatch, value)
        setDistricts((prev) => ({ ...prev, isFetching: false }))

    }

    useEffect(() => {
        setDistricts((prev) => ({ ...prev, Data: AllDistricts }));
        
        if(Object.keys(AllDistricts).length > 0)
            {
                setFormData((prev) => ({
                    ...prev,
                    distrct: AllDistricts.administrative_districts[0]
                }))
            }
        
    }, [AllDistricts])

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await UpdateVaccCentre(formData)
        
        if(status == 200)
            {
                navigate('/ManageVaccSpots')
            }
    }

    return vaccCentreData.isFetching && StateData.isFetching
        ? (<Loader />)
        : (
            <div className="container mt-5">
                <h3 className="Card-title">Edit Vaccination Centre</h3>
                <form className="d-flex flex-column" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>Centre Name</label>
                        <input type="text" className="form-control" defaultValue={vaccCentreData.Data.centreName} name="centreName" onChange={(e) => handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <select className="form-select" onChange={(e) => {handleDistricts(e); handleChange(e)}} name="state" defaultValue="default">
                            <option value="default" disabled>{vaccCentreData.Data.state}</option>
                            {
                                StateData.Data.map((state) =>

                                    (<option key={state.ISO} value={state.state}>{state.state}</option>)

                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>District</label>
                        <select className="form-select" defaultValue="default" name="distrct" onChange={(e) => handleChange(e)}>

                            {
                                Districts.isFetching
                                    ? (<option value="default" disabled>{vaccCentreData.Data.distrct}</option>)
                                    : (Districts.Data.administrative_districts.map((district) =>
                                    (
                                        <option key={district} value={district}>{district}</option>
                                    )))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea className="form-control" defaultValue={vaccCentreData.Data.address} name="address" onChange={(e) => handleChange(e)}></textarea>
                    </div>


                    <div className="mt-3 d-flex justify-content-center">
                        <button className="btn btn-primary mx-3" type="submit">Edit</button>
                        <button className="btn btn-danger mx-3" type="button" onClick={() => navigate(-1)}>Cancel</button>
                    </div>

                </form>

            </div>
        )
}