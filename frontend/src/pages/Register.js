import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rePassword, setRePassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup( userName, email, password);
    };

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
{/* 
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            onChange={(e) => setRePassword(e.target.value)}
                            value={rePassword}
                        />
                    </div> */}

                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>

                    {error && <div className="error">{error}</div>}
                </fieldset>
            </form>
        </>
    );
}
