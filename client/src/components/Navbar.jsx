import React,{useState,useEffect} from 'react'
// import { Transition } from "@headlessui/react";
// import {BsFillSunFill,BsFillMoonFill} from "react-icons/bs"
import {useNavigate, Link } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import userImg from '../assets/user.png'
import admindp from '../assets/admin.png'
const Navbar = () => {
    const navigate=useNavigate()
    const [sendLogout,{isLoading,isSuccess,isError,error}]=useSendLogoutMutation()
    const {email,isAdmin}=useAuth()
    if (isLoading){
      toast('Logging Out...');
    }
    if (isError) {
      toast.error(`Error : ${error.data?.message}`)
    }
    useEffect(()=>{
      if (isSuccess) navigate('/')
    },[isSuccess,navigate])
    const handleLogout=()=>{
      sendLogout()
    }
    return (

      <>
    <Toaster/>
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Flight Booking System</a>
  </div>
  <div className="flex-none">
    <div>{email}</div>
    <div className="dropdown dropdown-end">
   
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {isAdmin ? (<img src={admindp} />):(<img src={userImg} />)} 
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
   
    </>




      // <div>
      //   <Toaster />
      //   <nav className={`${darkMode?'dark':'light'} border-b border-zinc-900`}>
      //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      //       <div className="flex items-center justify-between h-16">
      //         <div className="flex items-center">
      //           <div className="flex-shrink-0">
            
      //             <h1 className={`${darkMode?'dark':'light'} font-black text-2xl`}>
      //               TECH Notes
      //             </h1>
      //           </div>
      //           <div className="hidden md:block">
      //             <div className="ml-10 flex items-baseline space-x-4">
      //               <Link
      //                 to='/dashboard'
      //                 className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium ${darkMode?'dark':'light'}`}
      //               >
      //                 Dashboard
      //               </Link>
  
      //               <Link
      //                 to='notes'
      //                 className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium ${darkMode?'dark':'light'}`}
      //               >
      //                 Notes
      //               </Link>
      //             {
      //               (isAdmin || isManager) &&
      //               <Link
      //                 to='users'
      //                 className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium ${darkMode?'dark':'light'}`}
      //               >
      //                 Users
      //               </Link>
      //             }
  
      //               <a
      //                 href="#"
      //                 className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium ${darkMode?'dark':'light'}`}
      //               >
      //                 Calendar
      //               </a>
  
      //               <button className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium  ${darkMode?'dark':'light'}`} 
      //                   onClick={handleLogout}
      //                   >Logout</button>
                    
      //                   <button className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium  ${darkMode?'dark':'light'}`} 
      //                   onClick={handleDarkMode}
      //                   >{darkMode?<BsFillMoonFill className='text-xl'/>:<BsFillSunFill className='text-xl'/>} </button>
                    
      //             </div>
      //           </div>
      //         </div>
      //         <div className="-mr-2 flex md:hidden">
      //           <button
      //             onClick={() => setIsOpen(!isOpen)}
      //             type="button"
      //             className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      //             aria-controls="mobile-menu"
      //             aria-expanded="false"
      //           >
      //             <span className="sr-only">Open main menu</span>
      //             {!isOpen ? (
      //               <svg
      //                 className="block h-6 w-6"
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 fill="none"
      //                 viewBox="0 0 24 24"
      //                 stroke="currentColor"
      //                 aria-hidden="true"
      //               >
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth="2"
      //                   d="M4 6h16M4 12h16M4 18h16"
      //                 />
      //               </svg>
      //             ) : (
      //               <svg
      //                 className="block h-6 w-6"
      //                 xmlns="http://www.w3.org/2000/svg"
      //                 fill="none"
      //                 viewBox="0 0 24 24"
      //                 stroke="currentColor"
      //                 aria-hidden="true"
      //               >
      //                 <path
      //                   strokeLinecap="round"
      //                   strokeLinejoin="round"
      //                   strokeWidth="2"
      //                   d="M6 18L18 6M6 6l12 12"
      //                 />
      //               </svg>
      //             )}
      //           </button>
      //         </div>
      //       </div>
      //     </div>
  
      //     <Transition
      //       show={isOpen}
      //       enter="transition ease-out duration-100 transform"
      //       enterFrom="opacity-0 scale-95"
      //       enterTo="opacity-100 scale-100"
      //       leave="transition ease-in duration-75 transform"
      //       leaveFrom="opacity-100 scale-100"
      //       leaveTo="opacity-0 scale-95"
      //     >
      //       {(ref) => (
      //         <div className="md:hidden" id="mobile-menu">
      //           <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      //             <Link
      //               to='/dashboard'
      //               className={`hover:${darkMode?'700':'300'}  block px-3 py-2 rounded-md text-base font-medium ${darkMode?'dark':'light'}`}
      //             >
      //               Dashboard
      //             </Link>
  
      //             <Link
      //               to='notes'
      //               className={`hover:${darkMode?'700':'300'}  block px-3 py-2 rounded-md text-base font-medium ${darkMode?'dark':'light'}`}
      //             >
      //               Notes
      //             </Link>
      //             {
      //               (isAdmin || isManager) &&
      //               <Link
      //               to='users'
      //               className={`hover:${darkMode?'700':'300'}  block px-3 py-2 rounded-md text-base font-medium ${darkMode?'dark':'light'}`}
      //             >
      //               Users
      //             </Link>
      //             }
                  
  
      //             <a
      //               href="#"
      //               className={`hover:${darkMode?'700':'300'}  block px-3 py-2 rounded-md text-base font-medium ${darkMode?'dark':'light'}`}
      //             >
      //               Calendar
      //             </a>
      //             <button className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium  ${darkMode?'dark':'light'}`} 
      //                   onClick={handleLogout}
      //                   >Logout</button>
      //             <br/>
      //             <button className={ `hover:bg-gray-${darkMode?'700':'300'} px-3 py-2 rounded-md text-sm font-medium  ${darkMode?'dark':'light'}`} 
      //                   onClick={handleDarkMode}
      //                   >{darkMode?<BsFillMoonFill className='text-xl'/>:<BsFillSunFill className='text-xl'/>} </button>
      //           </div>
      //         </div>
      //       )}
      //     </Transition>
      //   </nav>
   
      // </div>
    );
}

export default Navbar