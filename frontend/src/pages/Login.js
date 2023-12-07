import React, { useState } from 'react'


export default function Login() {

    const [email, setEmail]             = useState('')
    const [password, setPassword]       = useState('')


    const handleLogin = async (e) => {
        e.preventDefault()

        console.log(email, password);
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
                        type="text" 
                        class="form-control" 
                        placeholder="Input password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
            </fieldset>
        </form>
        </>
    )
}
