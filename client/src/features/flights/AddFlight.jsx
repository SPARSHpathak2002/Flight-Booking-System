import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useGetFlightsQuery,useBookFlightMutation } from './flightApiSlice'
const AddFlight = () => {
    const {email}=useAuth()
    
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        error
      }=useGetFlightsQuery()
    const [
      bookFlight,
        {
        isLoading:bl,
        isError:be,
        isSuccess:bs,
        error:e}
    ]=useBookFlightMutation()
    
      let content;
     const handlebooking=async(id)=>{
        await bookFlight({id,email})
     }
     useEffect(()=>{
      if(bs){
        alert("Flight Booked")
      }

     },[bs])
     useEffect(()=>{
      if(be){
        alert(e)
      }

     },[])

      if(isLoading){
        content=<div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <span className="loading loading-spinner loading-lg"></span></div>
      }
      if(bl){
        content=<div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <span className="loading loading-spinner loading-lg"></span></div>
      }
      if(isSuccess){
        content=data.map(flight=>(<> <div  className='my-1.5  w-full flex justify-between bg-gray-200 p-4 rounded-lg shadow-md'>
        <div>
        <p className='text-md'><b>{flight.name} {flight.flightnumber}</b></p>
        <p className='text-2xl'>{flight.from} -&gt; {flight.destination}</p>
        <p className='text-xl'>{flight.time} Hours </p>
        </div>
        <div>
          <p>Avilable Seats : <b>{flight.seats}</b></p>
          <p>price per seat : {flight.price} /-</p>
          <div className='flex justify-between align-baseline'>
            <button key={flight._id} onClick={()=>handlebooking(flight._id)} className='btn btn-wide btn-success'>Book </button>
          </div>
        </div>
      </div>
     
      </>
      ))
        console.log(data)
      }
      if(isError){
        content=<p>{error}</p>
      }
      return (
        <>
        {content}
        </>
      )
}

export default AddFlight