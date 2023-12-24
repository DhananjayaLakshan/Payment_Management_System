import React, { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext';
import { AiFillCaretRight } from "react-icons/ai";


export default function Sidebar() {
    // Retrieve dispatch function from the workouts context
    const { dispatch } = useWorkoutsContext()
    // Retrieve user information from the authentication context
    const { user } = useAuthContext()

    //fetch Data
    const [workouts, setWorkouts] = useState([])

    //fetch
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            setWorkouts(json)
            

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUT', payload: json })
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    // Define a function to get unique categories
    const getUniqueCategories = () => {
        const uniqueCategories = [...new Set(workouts.map((workout) => workout.category))];
        return uniqueCategories;
    };

    return (
        <div className='bg-white  p-2'>

            <div className='m-2'>
                <i className='bi bi-bootstrap-fill me-2 fs-4'></i>
                <span className='brand-name fs-4'>CATEGORIES</span>
            </div>

            <hr  className='text-dark'/>

            <div className='list-group list-group-flush'>

            {getUniqueCategories().map((uniqueCategory) => (
                                
                <a className='list-group-item  list-group-item-action py-2'>
                    <i className='bi bi-house fs-5 me-3'><AiFillCaretRight /></i>
                    <span className='fs-5'>{uniqueCategory}</span>
                </a>
            ))}

            </div>
        </div>
    )
}
