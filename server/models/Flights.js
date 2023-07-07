const mongoose=require('mongoose')

const FlightsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    flightnumber:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    },
    destination:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    seats:{type:Number,require:true},
    price:{type:Number,require:true},
    passengers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]

})
module.exports=mongoose.model('Flights',FlightsSchema)