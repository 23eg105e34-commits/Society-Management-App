import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {

  //get Token
  const Token=localStorage.getItem("token");
  //if  token not exists
  if(!Token){
    return<Navigate to="/" />

  }
  //Allow access to Dashboard
  return children;
}

export default ProtectedRoutes;
