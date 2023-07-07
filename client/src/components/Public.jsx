import React from 'react'
import { Link } from 'react-router-dom'
const Public = () => {
  return (
    <>
    <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Flight Booking System</span>
              <span className='text-4xl font-extrabold' >FBS</span>
            </a>
          </div>
          
         
          <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
            <Link to='/login' className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            
          </div>
        </nav>
        
      </header>
    <div className="relative  isolate px-6 pt-14 lg:px-8">
        <div
          className=" absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className=" mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Book Flights
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Book Air Tickets from Home
            <h2 className='text-4xl font-extrabold'>Features</h2>
            <ul>
                <li>Role Based Authentication and Permissions</li>
                <li>Security With JWT</li>
                <li>Optimized Application</li>
                <li>Built with MERN , Redux and RTK Query</li>
            </ul>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to='/login'
                className="rounded-md bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </Link>
              <Link
                to='/signup'
                className="rounded-md bg-pink-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </Link>
              
            </div>
            <p className='mt-4'>Made with <span>❤</span> by  <a href="https://github.com/SPARSHpathak2002" className='font-bold text-blue-500'>Sparsh Pathak</a></p>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Public