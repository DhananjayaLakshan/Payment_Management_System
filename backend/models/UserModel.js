const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    userName:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},

}, {timestamps:true})

module.exports = mongoose.model('Users', usersSchema)
