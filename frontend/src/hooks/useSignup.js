import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const ActionTypes = {
        LOGIN: 'LOGIN',
    };
    
    const signup = async (userName, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, email, password }),
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error || 'Signup failed');
            console.error('Signup error:', json); // Log the full error response for debugging
        }

        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: ActionTypes.LOGIN, payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
