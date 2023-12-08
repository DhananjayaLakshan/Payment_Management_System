const express = require('express')
const {
    
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout

} = require('../contollers/workoutControler')

const requireAuth = require('../middleware/requireAuth')

//requireAuth for all workouts
const router = express.Router()

router.use(requireAuth)

//GET all workouts
router.get('/', getAllWorkouts )

//GET a single workout
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//DELETE a workout
router.patch('/:id', updateWorkout)


module.exports = router