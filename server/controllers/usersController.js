const User=require('../models/User')

const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')

const getAllUsers =asyncHandler(async(req,res)=>{
     const users=await User.find().select('-password').populate({
        path: 'booked',
        select: 'name flightnumber from destination time',
      }).lean()
     if(!users?.length){
        return res.status(400).json({message:'No users found'})
     }
     res.json(users)
})
const createNewUser =asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body

    if( !username || !email || !password){
        return res.status(400).json({message:'all fields are required'})
    }
    const duplicate =await User.findOne({email}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:'Duplicate username'})
    }
    const hashPwd =await bcrypt.hash(password,10)

    const userObject={username,email,"password":hashPwd};
    const user =await User.create(userObject);

    if(user){
        res.status(201).json({message:`New user ${username} created`})
    }
    else{
        res.status(400).json({message:'Invalid Data Recived'})
    }

})
// const updateUser =asyncHandler(async(req,res)=>{
//     const { id, username, roles, active, password } = req.body

//     // Confirm data 
//     if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
//         return res.status(400).json({ message: 'All fields except password are required' })
//     }

//     // Does the user exist to update?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     // Check for duplicate 
//     const duplicate = await User.findOne({ username }).lean().exec()

//     // Allow updates to the original user 
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: 'Duplicate username' })
//     }

//     user.username = username
//     user.roles = roles
//     user.active = active

//     if (password) {
//         // Hash password 
//         user.password = await bcrypt.hash(password, 10) // salt rounds 
//     }

//     const updatedUser = await user.save()

//     res.json({ message: `${updatedUser.username} updated` })
// })
// const deleteUser =asyncHandler(async(req,res)=>{
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user still have assigned notes?
//     const note = await Note.findOne({ user: id }).lean().exec()
//     if (note) {
//         return res.status(400).json({ message: 'User has assigned notes' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.username} with ID ${result._id} deleted`

//     res.json(reply)
// })

module.exports={
    getAllUsers,
    createNewUser,
    // updateUser,
    // deleteUser
}
