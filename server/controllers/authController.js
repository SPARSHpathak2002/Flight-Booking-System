const User =require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password) return res.status(400).json({message:'All Fields are Required'})

    const foundUser=await User.findOne({email}).exec()

    if(!foundUser && !foundUser?.active) return res.status(401).json({message:'Unauthorized  2'})

    const match=await bcrypt.compare(password,foundUser.password);

    if(!match) return res.status(401).json({message:'Unauthorized'});

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15s' }
    )

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    
    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    
    res.json({ accessToken })
})

const refresh=asyncHandler((req,res)=>{
    const cookies=req.cookies

    if(!cookies?.jwt) return res.status(403).json({message:'Unauthhorized'})

    const refreshToken=cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err,decoded)=>{
            if(err) return res.status(403).json({message:'Forbidden'})

            const foundUser= await User.findOne({email:decoded.email}).exec();
            
            if(!foundUser) return res.status(401).json({message:'Unauthorized'})

            const accessToken=jwt.sign({
                "UserInfo":{
                    "email":foundUser.email,
                    "roles":foundUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15s'}
            )
            res.json({accessToken})
        })
    )
})

const logout= asyncHandler((req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)

    res.clearCookie('jwt',{
        httpOnly:true,
        sameSite:'none',
        secure:true
    })
    res.json({message:'Cookie Cleared'})
})
module.exports={
    login,refresh,logout
}