import React from 'react'
import Home from "../pages/Home";
import Login from "../pages/Login";
import Singup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails"
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Services from '../pages/Service';
import ProtectedRoutes from './ProtectedRoutes';

const Routers = () => {
  return <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Singup/>} />
    <Route path='/doctors' element={<Doctors/>} />
    <Route path='/doctorwithId' element={<DoctorDetails/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/users/profile/me' element={<ProtectedRoutes alloweRoles={["patient"]}><MyAccount/></ProtectedRoutes>} />
    <Route path='/doctors/profile/me' element={<ProtectedRoutes alloweRoles={["doctor"]}><Dashboard/></ProtectedRoutes>} />

  </Routes>
}

export default Routers