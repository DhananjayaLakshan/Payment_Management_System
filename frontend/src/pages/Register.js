import React, { useState,useEffect } from 'react';
import { useSignup } from '../hooks/useSignup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rePassword, setRePassword] = useState('');
    const { signup, isLoading, error } = useSignup();
    
    useEffect(() => {
        // Check for error and show toast

        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined, 
                theme: "light",
            })
        }

        
    }, [error])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let errorr = await signup(userName, email, password)

        console.log(errorr);

    
    }

    return (
        <>
            <form className="bg-white loginForm" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Input Username"
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Input Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Input password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    
                </fieldset>
            </form>
            <ToastContainer />

        </>
    );
}
