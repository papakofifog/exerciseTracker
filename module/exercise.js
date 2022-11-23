const mongoose= require('mongoose')
const { Schema } = require('mongoose');
const user = require('./user');


const ExerciseSchema= new Schema({
    description: {
        type: String,
        requrired: true
    },
    duration : {
        type: Number,
        required:true,
        
    },
    date: {
        type:Date,
        default: Date.now()
    }


});

ExerciseSchema.methods.show = ()=>{
    data= {
        _id: this._id,
        description: this.description,
        duration: this.duration,
        date:this.date

    }
    return data
}

ExerciseSchema.methods.castToString = ()=>{
    return this.date.toDateString()
}

module.exports=mongoose.model('exercise',ExerciseSchema)