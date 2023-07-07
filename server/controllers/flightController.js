const asyncHandler=require('express-async-handler')
const Flights=require('../models/Flights')
const User=require('../models/User')
const getAllFlights=asyncHandler(async(req,res)=>{
    const flights=await Flights.find().select('-passengers').lean()
     if(!flights?.length){
        return res.status(400).json({message:'No Flights found'})
     }
     res.json(flights)

})

const addFlight=asyncHandler(async(req,res)=>{
    const {
        flightnumber,
        name,
        from,
        destination,
        time,
        seats,
        price
    }=req.body

    if (!flightnumber || !name || !from || !destination || !time || !seats || !price){
        res.status(400).json({message:"All fields are required"})
    }
    const duplicate =await Flights.findOne({flightnumber}).lean().exec()

    if(duplicate){
        return res.status(409).json({message:'Already Added'})
    }
    const flightObject={
        name,
        flightnumber,
        from,
        destination,
        time,
        seats,
        price
    }
    const flight=await Flights.create(flightObject)

    if(flight){
        res.status(201).json({message:`New Flight ${name} ${flightnumber} added`})
    }
    else{
        res.status(400).json({message:'Invalid Data Recived'})
    }
    
})

const updateFlight=asyncHandler(async(req,res)=>{
    const {
        id,
        flightnumber,
        name,
        from,
        destination,
        time,
        seats,
        price
    }=req.body

    if (!id ||!flightnumber || !name || !from || !destination || !time || !seats || !price){
        res.status(400).json({message:"All fields are required"})
    }
    const flight = await Flights.findById(id).exec()

    if (!flight) {
        return res.status(400).json({ message: 'Flight not found' })
    }
    const duplicate =await Flights.findOne({flightnumber}).lean().exec()

    if(duplicate){
        return res.status(409).json({message:'Conflict with same'})
    }
    flight.flightnumber=flightnumber
    flight.name=name
    flight.from=from
    flight.destination=destination
    flight.time=time
    flight.seats=seats
    flight.price=price
    const updatedflight = await flight.save()

    res.json({ message: ` updated ` })
})

const deleteFlight=asyncHandler(async(req,res)=>{
    const {id}=req.body
    const flight=await Flights.findById(id).exec()
    if (!flight) {
        return res.status(400).json({ message: 'Flight not found' })
    }
    if (flight?.passengers.length){
        return res.status(400).json({ message: 'Flight have passengers' })
    }
    const result = await Flights.deleteOne()

    const reply = `Flight  deleted`

    res.json(reply)

})
const bookFlight=asyncHandler(async(req,res)=>{
    const {email,id} =req.body
    if (!email || !id) return res.status(400).json({message:'Required all field'})
    const founduser=await User.findOne({email}).exec()
    const foundflight=await Flights.findById(id)
    if (!founduser || !foundflight) return res.status(400).json({message:'User or Flight not found'})
    if (foundflight.seats == 0) return res.json({message:"FUll"})
    foundflight.seats=foundflight.seats-1
    foundflight.passengers=[...foundflight.passengers,founduser._id]
    founduser.booked=[...founduser.booked,foundflight._id]
    result =await foundflight.save()
    userresult = await founduser.save()
    res.status(200).json({message:'Flight booked'})

})
module.exports={
    getAllFlights,
    addFlight,
    updateFlight,
    deleteFlight,
    bookFlight
}