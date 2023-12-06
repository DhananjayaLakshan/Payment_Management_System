import React from 'react'

export default function Register() {
    return (
        <>
            <form className='bg-white loginForm '>
            <fieldset>
                <legend>Register</legend>

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


                {/* <div class="mb-3">
                    <label for="disabledSelect" class="form-label">Disabled select menu</label>
                    <select id="disabledSelect" class="form-select">
                        <option>Disabled select</option>
                    </select>
                </div> */}

                {/* <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" />
                            <label class="form-check-label" for="disabledFieldsetCheck">
                                Can't check this
                            </label>
                    </div>
                </div> */}

                <button type="submit" class="btn btn-primary">Register</button>
            </fieldset>
        </form>
        </>
    )
}
