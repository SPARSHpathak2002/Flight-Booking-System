import { useState } from "react"
import Layout from "./components/Layout"
import {Routes,Route} from 'react-router-dom'
import Public from "./components/Public"
import Login from "./features/auth/Login"
import DashLayout from "./components/DashLayout"
import DashBoardHome from "./features/auth/DashBoardHome"

import Prefetch from "./features/auth/Prefetch"
import PersistantLogin from "./features/auth/PersistantLogin"
import { ROLES } from "./config/roles"
import RequireAuth from "./features/auth/RequireAuth"
import AddFlight from "./features/flights/AddFlight"

import Signup from "./features/auth/Signup"
const App=()=>{
  
  const [darkMode,setDarkMode]=useState(false)

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Public/>}/>
        {/* <Route path='learnmore' element={<LearnMore/>}/> */}
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Route>

      <Route element={<PersistantLogin/>}>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.User]}/>} >
      <Route element={<Prefetch/>}>
      <Route path='/dashboard' element={<DashLayout/>}>
          <Route index element={<DashBoardHome/>}/>
          <Route path='bookflight' element={<AddFlight/>}/>
      </Route>
      </Route>
      </Route>
      </Route>
    </Routes>
    
    </>
  )
}

export default App
