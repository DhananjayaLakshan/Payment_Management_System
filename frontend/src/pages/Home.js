import React, { useEffect, useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Home() {

    const [workouts, setWorkouts] = useState(null)

    useEffect( () => {

        const fetchWorkouts = async() => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                setWorkouts(json)
            }
        }

        fetchWorkouts()

    }, [])



    return (
        <div>
            <h1>Home</h1>

            <Link to='/addTask'>
                <button className='btn btn-primary my-2 ms-auto addbtn'> Add task </button>
            </Link>

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
                

                <tr  key={workout._id}>
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
                        <td scope="col"></td>

                    </tr>

            ))}
                    
                </tbody>
            </table>
        </div>
    )
}
