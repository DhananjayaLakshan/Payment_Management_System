import React, { useState,useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom'


export default function UpdateForm() {

    const {id} = useParams()
    const { dispatch } = useWorkoutsContext()


    const [workout, setWorkout] = useState({
        id:id,
        name:'',
        email:'',
        adminAccount:'',
        payment:'',
        status:'',
        mobileNumber:'',
        startDate:'',
        dueDate:'',
        duration:'',
        group:'',
        paymentUpdate:''

    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)


    const {user} = useAuthContext()

    //fetch
    useEffect(() => {
        const fetchWorkouts = async () => {
            console.log(`/api/workouts/${id}`);
            
            const response = await fetch(`/api/workouts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            const formattedPaymentUpdate = json.paymentUpdate ? new Date(json.paymentUpdate).toISOString().split('T')[0] : '';
            const formattedStartDate = json.startDate ? new Date(json.startDate).toISOString().split('T')[0] : '';
            const formattedDueDate = json.dueDate ? new Date(json.dueDate).toISOString().split('T')[0] : '';

            setWorkout({
                ...workout,
                name:json.name,
                email:json.email,
                adminAccount:json.adminAccount,
                payment:json.payment,
                status:json.status,
                mobileNumber:json.mobileNumber,
                startDate:formattedStartDate,
                dueDate:formattedDueDate,
                duration:json.duration,
                group:json.group,
                paymentUpdate:formattedPaymentUpdate
            })
            
            console.log(workout);
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        if (!user) {
            toast.warn('You must be logged in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        // Form validation
        if (!workout.name || !workout.email || !workout.adminAccount || !workout.payment || !workout.mobileNumber) {
            toast.warn('All fields must be filled', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        if (isNaN(workout.payment) || Number(workout.payment) <= 0) {
            toast.warn('Payment must be a valid number greater than 0', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        if (!/^\d{10}$/.test(workout.mobileNumber)) {
            toast.warn('Mobile Number must be a 10-digit number', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
    
        try {
            const response = await fetch(`/api/workouts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    name: workout.name,
                    email: workout.email,
                    adminAccount: workout.adminAccount,
                    payment: workout.payment,
                    status: workout.status,
                    mobileNumber: workout.mobileNumber,
                    startDate: workout.startDate,
                    dueDate: workout.dueDate,
                    duration: workout.duration,
                    group: workout.group,
                    paymentUpdate: workout.paymentUpdate
                })
            });
    
            // const json = await response.json();

            const text = await response.text();  // Get the response as text
        console.log('Response text:', text);  // Log the response text

        const json = JSON.parse(text); 
    
            if (!response.ok) {
                setError(json.error);
            }
    
            if (response.ok) {
                toast.success('Updated Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
    
                setError(null);
                setSuccess('Task updated');
                console.log('Task updated');
    
                dispatch({ type: 'UPDATE_WORKOUT', payload: json });

                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error updating workout data:', error);
        }
    }

    return (
        <form className='bg-white addTask ' onSubmit={handleUpdate}>
            <fieldset>
                <legend>Update Task</legend>
                
                <div class="row mb-2">
                    <div class="col">

                        <input
                            type="text"
                            class="form-control"
                            placeholder="Name"
                            onChange={(e) => setWorkout({...workout,name:e.target.value})}
                            value={workout.name}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            onChange={(e) => setWorkout({...workout,email:e.target.value})}
                            value={workout.email}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Admin Account"
                            onChange={(e) => setWorkout({...workout,adminAccount:e.target.value})}
                            value={workout.adminAccount}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="payment Rs."
                            onChange={(e) => setWorkout({...workout,payment:e.target.value})}
                            value={workout.payment}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Status</label>
                        <select
                            class="form-select" i
                            id="inputGroupSelect01"
                            onChange={(e) => setWorkout({...workout,status:e.target.value})}
                            value={workout.status}
                        >
                            <option value="pending" selected>Pending</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Mobile Number"
                            onChange={(e) => setWorkout({...workout,mobileNumber:e.target.value})}
                            value={workout.mobileNumber}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <label>Start Date</label><br />
                        <input
                            type="date"
                            class="form-control"
                            placeholder="Admin Account"
                            onChange={(e) => setWorkout({...workout,startDate:e.target.value})}
                            value={workout.startDate.toString()}
                        />
                    </div>

                    <div class="col">
                        <label>Due Date</label><br />
                        <input
                            type="date"
                            class="form-control"
                            placeholder="Admin Account"
                            onChange={(e) => setWorkout({...workout,dueDate:e.target.value})}
                            value={workout.dueDate}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Duration"
                            onChange={(e) => setWorkout({...workout,duration:e.target.value})}
                            value={workout.duration}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="group"
                            onChange={(e) => setWorkout({...workout,group:e.target.value})}
                            value={workout.group}
                        />
                    </div>
                </div>

                <div class="col mb-2">
                    <label>payment update</label><br />
                    <input
                        type="date"
                        class="form-control"
                        placeholder="Admin Account"
                        onChange={(e) => setWorkout({...workout,paymentUpdate:e.target.value})}
                        value={workout.paymentUpdate}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
            <ToastContainer />
        </form>
    )
}
