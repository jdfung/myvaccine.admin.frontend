import React, { useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './Components/AdminLogin/LoginForm';
import ProtectedRoutes from './Components/ProtectedRoutes';
import { GetAuthHeader, VerifyToken, removeToken } from './Services/Login';
import HomePage from './Components/HomePage'
import NavBar from './Components/NavBar'
import ManageApplicantStatus from './Components/Management/ManageApplicantStatus'
import ManageApplicantAppointment from './Components/Management/ManageApplicantAppointment'
import ManageVaccSpots from './Components/Management/ManageVaccSpots'
import EditApplicantStatus from './Components/Management/EditApplicantStatus'
import AssignDate from './Components/Management/AssignDate'
import EditVaccSpot from './Components/Management/EditVaccSpot'
import AddVaccCentre from './Components/Management/AddVaccCentre'
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from './Services/AuthContext';



export const App = () => {
 

  return (
  
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/Login' element={<LoginForm/>}></Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/HomePage' element={<HomePage/>}></Route>
            <Route path='/ManageApplicantStatus' element={<ManageApplicantStatus/>}></Route>
            <Route path='/ManageApplicantAppointment' element={<ManageApplicantAppointment />}></Route>
            <Route path='/ManageVaccSpots' element={<ManageVaccSpots/>}></Route>
            <Route path='/EditApplicantStatus' element={<EditApplicantStatus />}></Route>
            <Route path='/AssignDate' element={<AssignDate />}></Route>
            <Route path='/EditVaccSpot' element={<EditVaccSpot />}></Route>
            <Route path='/AddVaccCentre' element={<AddVaccCentre />}></Route>
          </Route>   
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
