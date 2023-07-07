import React from 'react'
import {useGetFlightsQuery} from './flightApiSlice'
import FlightDetail from './FlightDetail'
const AllFlights = ({filterOption}) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error
  }=useGetFlightsQuery()

  let content;

  if(isLoading){
    content=<div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
    <span className="loading loading-spinner loading-lg"></span></div>
  }
  if(isSuccess){
    
    console.log(data)
    content=data.map(flight=>(<FlightDetail key={flight._id} {...flight}/>))

  }
  if(isError){
    content=<p>{error}</p>
  }
  return (
    content
  )
}

export default AllFlights