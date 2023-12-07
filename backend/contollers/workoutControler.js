const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

//GET all
const getAllWorkouts = async (req, res) => {
    try {
        //sort to create at order (last update show first)
        const workout = await Workout.find({}).sort({ createAt: -1 })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//GET a single
const getSingleWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){        
            return res.status(404).json({ error: 'No such workout' })
        }

        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        } else {
            res.status(200).json(workout);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//CREATE new 
const createWorkout = async (req, res) => {

    const { name, email, adminAccount, payment, paid, pending, mobileNumber, startDate, dueDate, duration, group, paymentUpdate  } = req.body

    //add doc to db
    try {
        const workout = await Workout.create({ name, email, adminAccount, payment, paid, pending, mobileNumber, startDate, dueDate, duration, group, paymentUpdate  })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//DELETE 
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){        
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    } else {
        res.status(200).json(workout)
    }

}

//UPDATE
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){        
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body})

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    } else {
        res.status(200).json(workout)
    }

}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
    
}