import React from 'react'
import { useDeleteFlightMutation } from './flightApiSlice'
const FlightDetail = ({_id,name,flightnumber,from,destination,seats,price,time}) => {
  
  const [deleteFlight,{isLoading,isSuccess,isError,error}]=useDeleteFlightMutation()
  const handleDelete=async()=>{
    await deleteFlight({id:_id})
  }
  return (
    <div className='my-1.5  w-full flex justify-between bg-gray-200 p-4 rounded-lg shadow-md'>
      <div>
      <p className='text-md'><b>{name} {flightnumber}</b></p>
      <p className='text-2xl'>{from} -&gt; {destination}</p>
      <p className='text-xl'>{time} Hours</p>
      </div>
      <div>
        <p>Avilable Seats : <b>{seats}</b></p>
        <p>price per seat : {price} /-</p>
        <div className='flex justify-between align-baseline'>
          <button className='btn btn-sm btn-info'>View Details</button>
          <button className='btn btn-sm btn-error' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default FlightDetail