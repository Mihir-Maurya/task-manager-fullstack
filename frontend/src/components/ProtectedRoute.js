import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = (props) => {
  const { Component } = props;
    const navigate = useNavigate();
   
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/")
        }
    });

    return (
    <div>
        <Component/>
    </div>
  )
}

export default ProtectedRoute