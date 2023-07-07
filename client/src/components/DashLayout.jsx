import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const DashLayout = () => {
   
  return (
    <>
    <Navbar />
    <div className="">
      <div className='h-screen md:w-1/2 m-auto'>
        <Outlet/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default DashLayout