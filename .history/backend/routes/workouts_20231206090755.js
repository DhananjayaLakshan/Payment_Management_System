const express = require('express')
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../contollers/workoutControler')

const router = express.Router()

//GET all workouts
router.get('/', getAllWorkouts )

//GET a single workout
router.get('/:id', getSingleWorkout)

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