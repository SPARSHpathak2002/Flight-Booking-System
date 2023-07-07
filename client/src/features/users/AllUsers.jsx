import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import Userflight from './Userflight'
import useAuth from '../../hooks/useAuth'
const AllUsers = ({filterOption}) => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error
  }=useGetUsersQuery()
  const {email}=useAuth()
  let content;

  if(isLoading){
    content=<div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
    <span className="loading loading-spinner loading-lg"></span></div>
  }
  if(isSuccess){
    
    let fdata=data.filter(d=>d.email==email)
    console.log(fdata[0]?.booked)
    if (fdata[0]?.booked?.length !=0){
      content=fdata[0].booked.map(flight=>(<Userflight key={flight._id} {...flight}/>))
    }
    else{
      content=<p>No data Available</p>
    }

  }
  if(isError){
    content=<p>{error}</p>
  }
  return (
    content
  )
}

export default AllUsers