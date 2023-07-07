import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { AiOutlineFileAdd, AiOutlineUserAdd } from 'react-icons/ai'
import { CgViewList } from 'react-icons/cg'
import { HiUsers } from 'react-icons/hi'
import AllFlights from '../flights/AllFlights'
import { useAddFlightMutation } from '../flights/flightApiSlice'
import AllUsers from '../users/AllUsers'


const DashBoardHome = () => {

  const navigate = useNavigate();
  const { username, isAdmin } = useAuth()

  const [name, setName] = useState('')
  const [flightnumber, setFlightNumber] = useState('')
  const [from, setFrom] = useState('')
  const [destination, setDestination] = useState('')
  const [seats, setSeats] = useState()
  const [price, setPrice] = useState()
  const [time, setTime] = useState('')

  const [date, setDate] = useState()
  const [hour, setHour] = useState()

  const[addFlight,{isLoading,isSuccess,isError,error}]=useAddFlightMutation()
  useEffect(() => {
    setTime(`${date} ${hour}`)
  }, [date, hour])
  useEffect(() => {
    if (isSuccess) {
      setName('')
      setFlightNumber('')
      setFrom('')
      setDestination('')

    }
  }, [isSuccess])
  const handleSubmit=async()=>{
    await addFlight({name,flightnumber,from,destination,time,seats,price})
  }
  return (
    <>

      <div className='flex flex-col m-5 md:flex-row justify-between pt-5'>
        {
          (isAdmin) &&
          <button className="btn btn-wide btn-info"onClick={()=>window.my_modal_2.showModal() }>Add Flights</button>
        }{(isAdmin) &&
          <button className="btn btn-wide btn-warning">Filter</button>

        }
        {(!isAdmin) && <div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          <button className='btn  btn-wide btn-success' onClick={()=>navigate('bookflight')}>Book Tickets</button>
        </div>}
      </div>
      {isAdmin ? <h2 className='text-2xl'>Flights</h2> : <h2 className='text-2xl'>My Bookings</h2>}
      <hr />
      {!isAdmin && <AllUsers/>}
      {isAdmin && <AllFlights />}
      <dialog id="my_modal_2" className="modal">
        <form method="dialog"  className="modal-box">
          
          <h2>Add Flight</h2>
          <span className='w-full inline-grid grid-cols-2 gap-2'>
            <span>
            <label className="label">
              <span className="label-text">Airline Name</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Airline name'
              type='text'
              onChange={(e) => setName(e.target.value)}
              required
            />
            </span>
            <span>
            <label className="label">
              <span className="label-text">Airline Number</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Airline Number'
              type='text'
              onChange={(e) => setFlightNumber(e.target.value)}
              required
            />
            </span>
            <span>
            <label className="label">
              <span className="label-text">From</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='From'
              type='text'
              onChange={(e) => setFrom(e.target.value)}
              required
            />
            </span>
            <span>
            <label className="label">
              <span className="label-text">Destination</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Destination'
              type='text'
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </span>
            <span>
            <label className="label">
              <span className="label-text">Seats</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Seats'
              type='number'
              onChange={(e) => setSeats(e.target.value)}
              required
            />
          </span>
            <span>
            <label className="label">
              <span className="label-text">Price</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Price'
              type='number'
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </span>
            <span>
            <label className="label">
              <span className="label-text">Date</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='Date'
              type='date'
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </span>
            <span>
            <label className="label">
              <span className="label-text">Time</span>

            </label>
            <input className='input input-bordered input-sm w-full max-w-xs'
              placeholder='hours'
              type='time'
              onChange={(e) => setHour(e.target.value)}
              required
            />
          </span>
          </span>
          <button onClick={handleSubmit} className='btn btn-sm w-full mt-2 btn-info'>ADD FLIGHT</button>
        </form>
        <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
      </dialog>
    </>
  )
}

export default DashBoardHome