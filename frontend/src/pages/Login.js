import React, { useState,useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const {login, error, isLoading}     = useLogin()
    const [email, setEmail]             = useState('')
    const [password, setPassword]       = useState('')

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

    const handleLogin = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <>
            <form className='bg-white loginForm ' onSubmit={handleLogin}>
            <fieldset>
                <legend>Login</legend>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Input Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        placeholder="Input password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
            </fieldset>
        </form>
        <ToastContainer />

        </>
    )
}
