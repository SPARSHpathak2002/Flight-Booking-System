import React from 'react'

const Userflight = ({_id,name,flightnumber,from,destination,time}) => {
    return (
        <div className='my-1.5  w-full flex justify-between bg-gray-200 p-4 rounded-lg shadow-md'>
          <div>
          <p className='text-md'><b>{name} {flightnumber}</b></p>
          <p className='text-2xl'>{from} -&gt; {destination}</p>
          
          </div>
          <div>
                <p className='text-xl'>{time} Hours</p>
            
          </div>
        </div>
      )
}

export default Userflight