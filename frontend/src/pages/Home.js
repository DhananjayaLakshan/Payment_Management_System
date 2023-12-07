import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>

            <Link to='/addTask'>
                <button className='btn btn-primary my-2 ms-auto addbtn'> Add task </button>
            </Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin Account</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Pending</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Group</th>
                        <th scope="col">Payment Update</th>


                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <th>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
