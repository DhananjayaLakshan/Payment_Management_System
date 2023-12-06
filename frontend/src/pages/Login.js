import React from 'react'

export default function Login() {
    return (
        <>
            <form className='bg-white loginForm '>
            <fieldset>
                <legend>Disabled fieldset example</legend>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="text" class="form-control" placeholder="Input Email"/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="text" class="form-control" placeholder="Input Password"/>
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

                <button type="submit" class="btn btn-primary">Submit</button>
            </fieldset>
        </form>
        </>
    )
}
