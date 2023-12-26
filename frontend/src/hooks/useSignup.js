import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const ActionTypes = {
        LOGIN: 'LOGIN',
    }

    const signup = async (userName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, email, password }),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error || 'Signup failed')
            console.error('Signup error:', json) // Log the full error response for debugging

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
        }else {
            window.location.href = '/login'
        }
    }
    <ToastContainer />
    return { signup, isLoading, error }
};
