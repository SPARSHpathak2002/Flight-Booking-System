import React from 'react'
import { useLocation ,Outlet,Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const RequireAuth = ({allowedRoles}) => {
    const {roles}=useAuth()
    const location=useLocation()
    console.log("Loacation :"+location)
    console.log("Roles from useAuth() :"+roles)
    console.log(allowedRoles)
    const even = (element) => element % 2 === 0;
    let content=(
        allowedRoles.some((r)=>r==roles) ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace={true}/>
    )

    return content
}

export default RequireAuth