const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    userId:{type:String},
    name:{type:String,require: true},
    email:{type:String,require: true},
    adminAccount:{type:String,require: true},
    payment:{type:Number,require: true},
    status:{type:String,require: true},
    mobileNumber:{type:Number,require: true},
    startDate:{type:String,require: true},
    dueDate:{type:String,require: true},
    duration:{type:String,require: true},
    group:{type:String,require: true},
    paymentUpdate:{type:String,require: true},

}, {timestamps: true})

module.exports= mongoose.model('Workout', workoutSchema)
