import React, { useContext } from 'react';
import { authContext } from "../context/authContext.js"
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children, alloweRoles}) => {
    const {token, role} = useContext(authContext);
    const isAllowed = alloweRoles.includes(role);
    console.log("alloweRoles => role => ", alloweRoles, role);
    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />
  return accessibleRoute
}

export default ProtectedRoutes