const express = require('express')
const {
    createWorkout,
} = require('../contollers/workoutControler')

const router = express.Router()

//GET all workouts
router.get('/' , (req,res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
router.get('/:id', (req,res)=>{
    res.json({messg: 'GET a single workout'})
})

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', (req,res) => {
    res.json({mess: 'DELETE a workout'})
})

//DELETE a workout
router.patch('/:id', (req,res) => {
    res.json({mess: 'UPDATE a workout'})
})




module.exports = router