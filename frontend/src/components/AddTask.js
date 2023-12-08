import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../hooks/useAuthContext';

export default function AddTask() {

    const { dispatch } = useWorkoutsContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [adminAccount, setAdminAccount] = useState('')
    const [payment, setPayment] = useState('')
    const [status, setStatus] = useState('pending')
    const [mobileNumber, setMobileNumber] = useState('')
    const [startDate, setStartDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [duration, setDuration] = useState('')
    const [group, setGroup] = useState('')
    const [paymentUpdate, setPaymentUpdate] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const {user} = useAuthContext()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!user) {
            {toast.warn('You must be logged in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })}
            return 
        }

        // Form validation
        if (!name || !email || !adminAccount || !payment || !mobileNumber) {
            
            {toast.warn('All fields must be filled', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })}
            return;
        }

        if (isNaN(payment) || Number(payment) <= 0) {

            {toast.warn('Payment must be a valid number greater than 0' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })}

            return;
        }

        if (!/^\d{10}$/.test(mobileNumber)) {
            
            {toast.warn('Mobile Number must be a 10-digit number' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })}
            return;
        }


        const tast = {
            name,
            email,
            adminAccount,
            payment,
            status,
            mobileNumber,
            startDate,
            dueDate,
            duration,
            group,
            paymentUpdate
        };

        console.log(tast); // Corrected variable name

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(tast),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            toast.success('Added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setName('');
            setEmail('');
            setAdminAccount('');
            setPayment('');
            setStatus('pending');
            setMobileNumber('');
            setStartDate('');
            setDueDate('');
            setDuration('');
            setGroup('');
            setPaymentUpdate('');

            setError(null);
            setSuccess('New task added')
            console.log('New task added')

            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    };


    return (
        <form className='bg-white addTask ' onSubmit={handleLogin}>
            <fieldset>
                <legend>Add Task</legend>

                <div class="row mb-2">
                    <div class="col">

                        <input
                            type="text"
                            class="form-control"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Admin Account"
                            onChange={(e) => setAdminAccount(e.target.value)}
                            value={adminAccount}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="payment Rs."
                            onChange={(e) => setPayment(e.target.value)}
                            value={payment}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Status</label>
                        <select
                            class="form-select" i
                            id="inputGroupSelect01"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
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
                            onChange={(e) => setMobileNumber(e.target.value)}
                            value={mobileNumber}
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
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                        />
                    </div>

                    <div class="col">
                        <label>Due Date</label><br />
                        <input
                            type="date"
                            class="form-control"
                            placeholder="Admin Account"
                            onChange={(e) => setDueDate(e.target.value)}
                            value={dueDate}
                        />
                    </div>
                </div>

                <div class="row mb-2">
                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Duration"
                            onChange={(e) => setDuration(e.target.value)}
                            value={duration}
                        />
                    </div>

                    <div class="col">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="group"
                            onChange={(e) => setGroup(e.target.value)}
                            value={group}
                        />
                    </div>
                </div>

                <div class="col mb-2">
                    <label>payment update</label><br />
                    <input
                        type="date"
                        class="form-control"
                        placeholder="Admin Account"
                        onChange={(e) => setPaymentUpdate(e.target.value)}
                        value={paymentUpdate}
                    />
                </div>


                


                <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
            <ToastContainer />
        </form>

    )

}
