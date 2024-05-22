import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { GetAllStates, GetAllDistricts, AddVaccCentre } from "../../Services/VaccCentre";
import Loader from "../Loader";

export default () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllStates = useSelector(state => state.VaccCentreReducer.States)
    const AllDistricts = useSelector(state => state.VaccCentreReducer.Districts)
    const [StateData, setStateData] = useState({ Data: null, isFetching: true });
    const [Districts, setDistricts] = useState({ Data: null, isFetching: true });
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        GetAllStates(dispatch)
    }, [])

    useEffect(() => {
        setStateData({ Data: AllStates, isFetching: false })
    }, [AllStates])

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
        const status = await AddVaccCentre(formData);
        if(status == 200)
            {
                navigate('/ManageVaccSpots')
            }
    }

    return StateData.isFetching
    ? (<Loader />)
    :(
        <div className="container mt-5">
                <h3 className="Card-title">New Vaccination Centre</h3>
                <form className="d-flex flex-column" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>Centre Name</label>
                        <input type="text" className="form-control" name="centreName" onChange={(e) => handleChange(e)}></input>
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <select className="form-select" name="state" onChange={(e) => {handleDistricts(e); handleChange(e)}}>
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
                                    ? (<option>----Select District----</option>)
                                    : (Districts.Data.administrative_districts.map((district) =>
                                    (
                                        <option key={district} value={district}>{district}</option>
                                    )))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea className="form-control" name="address" onChange={(e) => handleChange(e)}></textarea>
                    </div>


                    <div className="mt-3 d-flex justify-content-center">
                        <button className="btn btn-primary mx-3" type="submit">Add</button>
                        <button className="btn btn-danger mx-3" type="button" onClick={() => navigate('/ManageVaccSpots')}>Cancel</button>
                    </div>

                </form>

            </div>
    )
}