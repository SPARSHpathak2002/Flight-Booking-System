const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    roles:
        {
            type:String,
            default:"user"
        }
    ,
    active:{
        type:Boolean,
        default:true
    },
    booked:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Flights'
        }
    ]
})

module.exports=mongoose.model('User',userSchema)