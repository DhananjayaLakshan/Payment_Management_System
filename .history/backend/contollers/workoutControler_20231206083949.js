const Workout = require('../models/WorkoutModel')

//GET all
const getAllWorkouts = async (req, res) => {
    try {
        const workout = await Workout.find()
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//GET a single

//CREATE new 
const createWorkout = async (req,res) => {

    const {title, load, reps} = req.body

    //add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE 

//UPDATE

module.exports = {
    createWorkout
}