const express = require('express')

const {
    createNewUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../contollers/usersControler')

const router = express.Router()

//Get all users
router.get ('/', getAllUsers)

//login
router.post ('/login', loginUser)

//Get one user
router.get ('/:id', getOneUser)


//Add a user
router.post ('/signup', createNewUser)


//Delete a user
router.delete ('/:id', deleteUser)


//Update a user 
router.patch ('/:id', updateUser)

module.exports = router