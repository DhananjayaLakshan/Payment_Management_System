import React, { useState } from 'react'

export default function AddTask() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [adminAccount, setAdminAccount] = useState('')
    const [payment, setPayment] = useState('')
    const [paid, setPaid] = useState('')
    const [pending, setPending] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [startDate, setStartDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [duration, setDuration] = useState('')
    const [group, setGroup] = useState('')
    const [paymentUpdate, setPaymentUpdate] = useState('')


    const handleChange = (data) =>{
        if (data == 'paid') {
            setPaid(true)
        }else{
            setPaid(false)
        }

        if (data == 'pending') {
            setPending(true)
        }else{
            setPending(false)
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault()

        console.log(name, email, adminAccount,payment,paid,pending,mobileNumber,startDate,dueDate,duration,group,paymentUpdate)
    }


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
                        type="text" 
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
                    <div class="col">
                        <label className='me-2'>Paid</label>
                        <input 
                            type="checkbox" 
                            aria-label="Checkbox for following text input"
                            onChange={() => handleChange("paid")}
                            value={paid}
                        />                        
                    </div>
                    

                    <div class="col">
                        <label className='me-2'>Pending</label>
                        <input 
                            type="checkbox" 
                            aria-label="Checkbox for following text input"
                            onChange={() => handleChange("pending")}
                            value={pending}
                        />                        
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
        </form>
    )

}
