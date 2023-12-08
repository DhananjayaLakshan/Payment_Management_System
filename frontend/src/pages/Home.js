import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { MdDeleteForever } from "react-icons/md"
import { TiEdit } from "react-icons/ti"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../hooks/useAuthContext'

export default function Home() {

    const { workouts, dispatch } = useWorkoutsContext()
    const [dublicateWorkot, setDublicateWorkot] = useState([])

//fetch
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            setDublicateWorkot(json)

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUT', payload: json })
            }
        }

        fetchWorkouts()
    }, [dispatch])

    console.log(dublicateWorkot)

    const handleDelete = async (id) => {
        console.log('/api/workouts/'+ id);
        const response = await fetch('/api/workouts/'+ id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });


        const json = await response.json()

        if (response.ok) {
            toast.success('Deleted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            dispatch({type: 'DELETE_WORKOUT', payload: json})
            console.log('deleted');
        }


    }

    return (
        <div>
            <h1>Home</h1>

            <div>
            <Link to='/addTask'>
                <button className='btn btn-primary my-2 ms-auto addbtn'> Add task </button>
            </Link>
            </div>

            <table className="table table-striped">
                <thead>

                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin Account</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Status</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Group</th>
                        <th scope="col">Payment Update</th>
                        <th scope="col">Action</th>
                    </tr>

                </thead>
                <tbody>

                    {workouts && workouts.map((workout) => (


                        <tr key={workout._id}>
                            <td scope="col">{workout.name}</td>
                            <td scope="col">{workout.email}</td>
                            <td scope="col">{workout.adminAccount}</td>
                            <td scope="col">{workout.payment}</td>

                            <td scope="col">
                                {workout.status}
                            </td>

                            <td scope="col">{workout.mobileNumber}</td>
                            <td scope="col">{workout.startDate}</td>
                            <td scope="col">{workout.dueDate}</td>
                            <td scope="col">{workout.duration}</td>
                            <td scope="col">{workout.group}</td>
                            <td scope="col">{workout.paymentUpdate}</td>
                            <td scope="col">
                                <button className='btn btn-outline-primary me-2 mt-2'><TiEdit style={{ fontSize: '20px' }} /></button>
                                <button className='btn btn-danger mt-2' onClick={() => handleDelete(workout._id)}><MdDeleteForever style={{ fontSize: '20px' }} /></button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}
