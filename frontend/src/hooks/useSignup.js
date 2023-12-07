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
        }

        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({ type: ActionTypes.LOGIN, payload: json })

            setIsLoading(false)

            toast.success('Sign Up successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    // Redirect to the login page after toast is closed
                    window.location.href = '/login'
                },
            })
        }
    }
    <ToastContainer />
    return { signup, isLoading, error }
};
