import React, { useEffect, useState, Navigate , useRef } from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { MdDeleteForever } from "react-icons/md"
import { TiEdit } from "react-icons/ti"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from '../hooks/useAuthContext'
import { FiRefreshCcw } from "react-icons/fi"
import ExcelJS from 'exceljs'
import saveAs from 'file-saver'
import * as xlsx from 'xlsx'

export default function Home() {

    const { workouts, dispatch } = useWorkoutsContext()

    const { user } = useAuthContext()
    const [wworkouts, setWorkouts] = useState([])
    const [dublicateWorkot, setDublicateWorkot] = useState([])

    const [searchkey, setsearchkey] = useState('') // State for search input
    const [type, settype] = useState('all')
    const [searchDate, setSearchDate] = useState('')

    const [data, setdata] = useState([])

    const refresh = () => {
        // Use window.location.href to navigate to the home page
        console.log('Refresh function is called!')
        window.location.reload()
    }

    // Function to generate and download the Excel report
    const generateExcelReport = () => {
        if (wworkouts.length === 0) {
            alert('No workout data to export.');
            return;
        }

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Workouts');

        // Define the header row
        worksheet.addRow([
            'Name',
            'Email',
            'Admin Account',
            'Payment',
            'Status',
            'Mobile Number',
            'Starting Date',
            'Due Date',
            'Duration',
            'Group',
            'Payment Update',
        ]);

        // Add data rows
        wworkouts.forEach((workout) => {
            worksheet.addRow([
                workout.name,
                workout.email,
                workout.adminAccount,
                workout.payment,
                workout.status,
                workout.mobileNumber,
                workout.startDate,
                workout.dueDate,
                workout.duration,
                workout.group,
                workout.paymentUpdate,
            ]);
        });

        // Generate the Excel file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'workouts.xlsx');
        });
    };

    // Function to filter rooms by search keyword
    function filterBySearch() {

        const tempSerch = dublicateWorkot.filter((wokout) =>
            wokout.name.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.email.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.adminAccount.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.mobileNumber.toString().includes(searchkey.toString())
        )
        setWorkouts(tempSerch)
    }

    function filterByType(e) {

        if (e !== 'all') {

            const tempStatus = dublicateWorkot.filter(
                (workout) => workout.status.toLowerCase() === e.toLowerCase()
            )

            setWorkouts(tempStatus)
        } else {
            setWorkouts(dublicateWorkot)
        }
    }

    function filterByDate(e) {
        console.log(e)

        if (e) {
            const tempDate = dublicateWorkot.filter(
                (workout) => workout.dueDate.toString().includes(e.toString())
            )

            setWorkouts(tempDate)

        } else {
            setWorkouts(dublicateWorkot)
        }
    }

    //fetch
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            setWorkouts(json)
            setDublicateWorkot(json)

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUT', payload: json })
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    console.log(dublicateWorkot)

    //delete
    const handleDelete = async (id) => {
        console.log('/api/workouts/' + id)
        const response = await fetch('/api/workouts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })


        const json = await response.json()

        if (response.ok) {
            toast.success('Deleted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
            console.log('deleted')

            // Update the local state without refreshing the page
            setWorkouts((prevWorkouts) => {
                const updatedWorkouts = prevWorkouts.filter((workout) => workout._id !== id);
                return updatedWorkouts;
            });
        } else {
            console.error('Failed to delete workout');
        }



    }

    //update
    const handleStatusUpdate = async (id, newStatus) => {
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        const json = await response.json();

        if (response.ok) {
            toast.success('Status Updated Successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        }

        // Update both local and original state
        setWorkouts((prevWorkouts) => {
            const updatedWorkouts = prevWorkouts.map((workout) =>
                workout._id === id ? { ...workout, status: newStatus } : workout
            );
            return updatedWorkouts;
        });

        setDublicateWorkot((prevWorkouts) => {
            const updatedWorkouts = prevWorkouts.map((workout) =>
                workout._id === id ? { ...workout, status: newStatus } : workout
            );
            return updatedWorkouts;
        });
    };
    
    const fileInputRef = useRef(null);

    const handleFileImport = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelFile = xlsx.read(data);
        const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
        const excelJson = xlsx.utils.sheet_to_json(excelSheet);
    
        console.log(excelJson);
    
        for (const dataItem of excelJson) {
            console.log(dataItem);
            try {
                const response = await fetch('/api/workouts', {
                    method: 'POST',
                    body: JSON.stringify(dataItem),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                if (response.ok) {
                    toast.success('Data inserted successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
    
                    console.log('Data inserted successfully!');
    
                    // Reload the page to see the inserted data
                    window.location.reload();
    
                    // Optionally, you can handle success here.
                } else {
                    toast.warn('Failed to insert data into the database.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    console.error('Failed to insert data into the database.');
                }
            } catch (error) {
                console.error('Error during POST request:', error);
            }
        }
    };

    const handleClick = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    }

    return (
        <div>


            <nav class="navbar navbar-expand-lg bg-body-tertiary mt-5">
                <div class="container-fluid">

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 " >

                            <a class="nav-link active"
                                aria-current="page"
                                style={{ cursor: 'pointer', fontSize: '25px' }}
                                onClick={() => refresh()}>
                                <FiRefreshCcw />
                            </a>

                            <div>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileImport}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Hide the file input
                                />
                                <button className='btn btn-outline-primary my-2 me-2' onClick={handleClick}>Import Excel File</button>
                            </div>


                            <button className='btn btn-outline-success my-2' onClick={generateExcelReport}>
                                Export
                            </button>

                        </ul>


                        <div className="con-md-3 me-2" value={type} onChange={(e) => filterByType(e.target.value)}>
                            <select className="form-control">
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        <input
                            class="form-control me-2"
                            style={{ display: 'flex', width: '200px' }}
                            type="date"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchDate}
                            onChange={(e) => {
                                setSearchDate(e.target.value)
                                filterByDate(e.target.value)
                            }}

                        />


                        <input
                            class="form-control me-2"
                            style={{ display: 'flex', width: '200px' }}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchkey}
                            onChange={(e) => {
                                setsearchkey(e.target.value)
                            }}
                            onKeyUp={filterBySearch}
                        />

                        <div className='addbtn'>
                            <Link to='/addTask'>
                                <button className='btn btn-primary my-2 ms-auto '> Add task </button>
                            </Link>
                        </div>

                    </div>

                </div>
            </nav>

            <table className="table table-striped">
                <thead>

                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin Account</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Status</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Starting Date</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Group</th>
                        <th scope="col">Payment Update</th>
                        <th scope="col">Action</th>
                    </tr>

                </thead>
                <tbody>

                    {wworkouts && wworkouts.map((workout) => (


                        <tr key={workout._id}>
                            <td scope="col">{workout.name}</td>
                            <td scope="col">{workout.email}</td>
                            <td scope="col">{workout.adminAccount}</td>
                            <td scope="col">{workout.payment}</td>

                            <td scope="col">
                                <div className="con-md-3 me-2">
                                    <select
                                        className="form-control"
                                        value={workout.status}
                                        onChange={(e) => handleStatusUpdate(workout._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                            </td>

                            <td scope="col">{workout.mobileNumber}</td>
                            <td scope="col">{workout.startDate}</td>
                            <td scope="col">{workout.dueDate}</td>
                            <td scope="col">{workout.duration}</td>
                            <td scope="col">{workout.group}</td>
                            <td scope="col">{workout.paymentUpdate}</td>
                            <td scope="col">
                                <button className='btn btn-outline-primary me-2 mt-2'><TiEdit style={{ fontSize: '20px' }} /></button>
                                <button className='btn btn-danger mt-2' onClick={() => handleDelete(workout._id)}><MdDeleteForever style={{ fontSize: '20px' }} /></button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}
