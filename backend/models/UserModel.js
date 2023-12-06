const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    userName:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},

}, {timestamps:true})

// static signup method
usersSchema.statics.signup = async function(userName, email, password) {
    try {

        //validator
        if (!userName || !email || !password) {
            throw Error('All fields must be filled')
        }

        if (!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password not string enough')
        }

        const existsEmail = await this.findOne({ email })

        if (existsEmail) {
            throw new Error('Email already in use')
        }

        const existsUsername = await this.findOne({ userName })

        if (existsUsername) {
            throw new Error('Username already in use')
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await this.create({ userName, email, password: hash })

        return user

    } catch (error) {
        throw error
    }
}


//static login method

usersSchema.statics.login = async function(email, password) {
    try {
        // Validate input
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find user by email
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('Incorrect email');
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Incorrect password');
        }

        return user;
    } catch (error) {
        throw error;
    }
};


module.exports = mongoose.model('Users', usersSchema)
