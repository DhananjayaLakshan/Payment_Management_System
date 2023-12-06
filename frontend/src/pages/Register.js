import React from 'react'

export default function Register() {
    return (
        <>
            <form className='bg-white loginForm '>
            <fieldset>
                <legend>Register</legend>

                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input type="text" class="form-control" placeholder="Input Username"/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="text" class="form-control" placeholder="Input Email"/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="text" class="form-control" placeholder="Input Password"/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input type="text" class="form-control" placeholder="Input Confirm Password"/>
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </fieldset>
        </form>
        </>
    )
}
