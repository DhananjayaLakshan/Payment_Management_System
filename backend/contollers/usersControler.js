const Users = require('../models/UserModel')
const mongoose = require('mongoose')

//Get all
const getAllUsers = async (req,res) => {

    try {
        const user = await Users.find()
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//Get all
const loginUser = async (req,res) => {
    
    

}



//Get one
const getOneUser = async (req,res) => {

    try {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such user'})
        }

        const user = await Users.findById(id)

        if(!user){
            return res.status(404).json({error: 'No such user'})

        }else{
            res.status(200).json(user)
        }
        
    } catch (error) {        
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}


//Create new user
const createNewUser = async (req,res ) => {

    const { userName, email, password } = req.body

    try {
        const user = await Users.signup(userName, email, password)
        res.status(200).json({userName, email,user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//Delete
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await Users.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: 'No such user'})

    }else{
        res.status(200).json(user)

    }
}


//Update
const updateUser = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }

    const user = await Users.findByIdAndUpdate({_id: id}, {...req.body})

    if (!user) {
        return res.status(404).json({error: 'No such user'})

    }else{
        res.status(200).json(user)

    }

}


module.exports = {
    createNewUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}
