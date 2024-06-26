import { useEffect, useState } from "react"
import { GetAllVaccCentres, SearchVaccByID, deleteVaccCentre } from "../../Services/VaccCentre"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, Modal, Button } from "react-bootstrap";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { reset } from "../../app/VaccCentreReducer";

export default ({Token}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allVaccSpots = useSelector(state => state.VaccCentreReducer.VaccCentre)
    const [allVaccData, setAllVaccData] = useState({Data: null, isFetching: true});
    const [show, setShow] = useState(false);
    const [searchForm, setSearchForm] = useState("");
    const handleShow = (id) => setShow({status: true, id: id});
    const handleClose = () => setShow({status: false, id: null});

    useEffect(() => {
        GetAllVaccCentres(dispatch)
        return () => dispatch(reset());
    }, [])

    useEffect(() => {
        setTimeout(() => setAllVaccData({Data: allVaccSpots, isFetching: false}), 600);
    }, [allVaccSpots])
    

    const handleDelete = async (id) => {
       const status = await deleteVaccCentre(id);
       if(status == 200)
        {
            navigate(0);
        }
    }

    const handleChange = (e) => {
        var value = e.target.value;
        setSearchForm(value);
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const status = await SearchVaccByID(dispatch, searchForm);
        if(status == 200)
            {

            }
        else
        {
            alert("Vaccination Centre doesnt exist");
        }
    }

    const handleClick = () => {
        console.log(Token)
    }
    

    return allVaccData.isFetching
    ? (<Loader />)
    : (
        <div className="container mt-5">
            <Row className="align-items-center mb-5">
                <h2 className="card-title">
                    Vaccination Spots Management
                </h2>
            </Row>
            <Row className="align-items-center mb-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <h5 className="card-title">Vaccination Centres List <span className="text-muted fw-normal ms-2">({allVaccData.Data.length})</span></h5>
                    </div>
                </div>
            </Row>
            <Row className="mb-3">
                <div className="d-flex w-75">
                    <form className="d-flex flex-fill" onSubmit={(e) => {handleSearchSubmit(e)}}>
                        <input className="form-control mr-3" placeholder="Search by ID" onChange={(e) => handleChange(e)}></input>
                        <button className="btn btn-primary mx-2">Search</button>
                    </form>
                    <button className="btn btn-success" type="button" onClick={() => navigate('/AddVaccCentre')}>Add</button>
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
                                {
                                    allVaccData.Data.map((data, index) => {
                                        return (
                                            
                                                <tr key={data.centreId}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{data.centreId}</td>
                                                    <td>{data.centreName}</td>
                                                    <td>{data.state}</td>
                                                    <td>{data.distrct}</td>
                                                    <td>{data.address}</td>
                                                    <td>
                                                        <Row><button className="btn btn-primary" onClick={() => navigate('/EditVaccSpot', {
                                                            state: {
                                                                id: data.centreId,
                                                                state: data.state,
                                                                district: data.distrct
                                                            }
                                                        })}>Edit</button></Row>
                                                        <Row><button className="btn btn-danger" type="button" onClick={() => handleShow(data.centreId)}>Delete</button></Row>
                                                    </td>
                                                </tr>)
        
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Row>

            <Modal show={show.status} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Centre</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this centre?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => handleDelete(show.id)}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        
        </div>
         
    )
}