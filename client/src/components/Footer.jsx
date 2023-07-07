import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import {BsHouseFill}from 'react-icons/bs'
import useAuth from '../hooks/useAuth'
const Footer = ({darkMode}) => {
    const navigate=useNavigate()
    const {pathname}=useLocation()
    const {email}=useAuth()
    const onGoHomeClicked=()=>navigate('/dashboard')
    let goHomeButton=null

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentTime(new Date());
          }, 1000);
      
          // Clean up the interval on component unmount
          return () => {
            clearInterval(interval);
          };
    },[])

    if(pathname !== '/dashboard'){
        goHomeButton=(<button
            title='Home'
            onClick={onGoHomeClicked}
            className={ `hover:${darkMode?'bg-gray-700':'bg-gray-300'} px-3 py-2 rounded-md text-sm font-medium  ${darkMode?'dark':'light'}`}
        >
            <BsHouseFill className='text-xl'/>
        </button>)
    }
  return (
    
        <footer className={`${darkMode ? 'dark' : 'light'} h-16 flex justify-around items-center border-t border-zinc-900`}>
            <p className=''>Current User : {email}</p>
            <p className=''>{currentTime.toLocaleTimeString()}</p>
            {goHomeButton}
        </footer>
    
  )
}

export default Footer