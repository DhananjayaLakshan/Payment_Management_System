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
        // Handle any errors that occur during the execution of the function
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//CREATE new 
const createWorkout = async (req, res) => {

    const { title, load, reps } = req.body

    //add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        // Use { new: true } to get the updated document
        const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        } else {
            res.status(200).json(workout);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
    
}