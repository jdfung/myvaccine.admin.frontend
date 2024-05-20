import React from 'react';
import './App.css';
import HomePage from './Components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from './Components/NavBar';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ManageApplicantStatus from './Components/Management/ManageApplicantStatus';
import ManageApplicantAppointment from './Components/Management/ManageApplicantAppointment';
import ManageVaccSpots from './Components/Management/ManageVaccSpots';
import EditApplicantStatus from './Components/Management/EditApplicantStatus';
import AssignDate from './Components/Management/AssignDate';

function App() {

  const RouterRoutes = () => {

    return(
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path='/ManageApplicantStatus' element={<ManageApplicantStatus />}></Route>
        <Route path='/ManageAppointmentStatus' element={<ManageApplicantAppointment />}></Route>
        <Route path='/ManageVaccSpots' element={<ManageVaccSpots />}></Route>
        <Route path='/EditApplicantStatus' element={<EditApplicantStatus />}></Route>
        <Route path='/AssignDate' element={<AssignDate />}></Route>
      </Routes>
    )
  }


  return (
    <>
    <Router>
      <NavBar />
      <RouterRoutes />
    </Router>
    </> 
  );
}

export default App;
