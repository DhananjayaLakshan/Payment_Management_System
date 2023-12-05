const express = require('express')
const Workout = require('../models/WorkoutModel')

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
router.post('/', async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//DELETE a workout
router.delete('/:id', (req,res) => {
    res.json({mess: 'DELETE a workout'})
})

//DELETE a workout
router.patch('/:id', (req,res) => {
    res.json({mess: 'UPDATE a workout'})
})




module.exports = router