import React, { useEffect, useState, Navigate, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { MdDeleteForever } from "react-icons/md"
import { TiEdit } from "react-icons/ti"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from '../hooks/useAuthContext'
import ExcelJS from 'exceljs'
import saveAs from 'file-saver'
import * as xlsx from 'xlsx'

export default function Home() {

    //context
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    //fetch and setData
    const [wworkouts, setWorkouts] = useState([])
    const [dublicateWorkot, setDublicateWorkot] = useState([])

    //Search 
    const [searchkey, setsearchkey] = useState('')
    const [type, setType] = useState('all')
    const [list, setList] = useState('added')
    const [searchDate, setSearchDate] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filterCategory, setFilterCategory] = useState([])

    //updatePayment useState
    const [paymentUpdate, setPaymentUpdate] = useState('')

    //bulk select to update
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);

    // Add this state variable
    const [adminAccountUpdate, setAdminAccountUpdate] = useState('');

    //set View Record Count in front end
    const [viewRecordCount, setViewRecordCount] = useState(10)

    //set pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = viewRecordCount
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = wworkouts.slice(firstIndex, lastIndex)
    const numberOfPages = Math.ceil(wworkouts.length / recordsPerPage)
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1)

    // Pagination functions
    function nextPage() {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage(id) {
        setCurrentPage(id)
    }

    // Function to filter task by search keyword
    function filterBySearch() {
        const tempSerch = dublicateWorkot.filter((wokout) =>
            wokout.name.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.email.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.adminAccount.toLowerCase().includes(searchkey.toLowerCase()) ||
            wokout.mobileNumber.toString().includes(searchkey.toString())
        )
        setWorkouts(tempSerch)
    }

    // Function to filter workouts by type
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

    // Function to filter workouts by date
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

    function filterByList(value) {
        if (value === 'added') {
            setWorkouts(dublicateWorkot);
        } else {
            const today = new Date();
            const filteredWorkouts = dublicateWorkot
                .filter((workout) => {
                    const workoutDueDate = new Date(workout.dueDate);
    
                    if (value === 'future') {
                        // Include workouts with due dates greater than or equal to today
                        return workoutDueDate >= today;
                    } else if (value === 'past') {
                        // Include workouts with due dates less than today
                        return workoutDueDate < today;
                    }
    
                    // Handle other cases if needed
    
                    return true; // Default case
                })
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
            setWorkouts(filteredWorkouts);
        }
    }

    // Define a function to get unique categories
    const getUniqueCategories = () => {
        const uniqueCategories = [...new Set(filterCategory.map((workout) => workout.category))];
        return uniqueCategories;
    }

    // Update the filterByCategories function to set the selected category
    function filterByCategories(e) {
        const selectedCategoryValue = e.target.value;

        const filteredWorkouts = dublicateWorkot.filter((workout) => {
            return selectedCategoryValue === 'all' || workout.category === selectedCategoryValue;
        });

        setWorkouts(filteredWorkouts);
        setSelectedCategory(selectedCategoryValue);
        
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
            setFilterCategory(json)

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
                const updatedWorkouts = prevWorkouts.filter((workout) => workout._id !== id)
                return updatedWorkouts
            })
        } else {
            console.error('Failed to delete workout')
        }
    }


    //import excel file
    const fileInputRef = useRef(null)
    const handleFileImport = async (e) => {
        const file = e.target.files[0]
        const data = await file.arrayBuffer(file)
        const excelFile = xlsx.read(data)
        const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]]
        const excelJson = xlsx.utils.sheet_to_json(excelSheet)

        console.log(excelJson)

        for (const dataItem of excelJson) {
            console.log(dataItem)
            try {
                const response = await fetch('/api/workouts', {
                    method: 'POST',
                    body: JSON.stringify(dataItem),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                })

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
                    })

                    console.log('Data inserted successfully!')

                    // Reload the page to see the inserted data
                    window.location.reload()

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
                    })
                    console.error('Failed to insert data into the database.')
                }
            } catch (error) {
                console.error('Error during POST request:', error)
            }
        }
    }

    // export Excel File
    const generateExcelReport = () => {
        if (wworkouts.length === 0) {
            alert('No workout data to export.')
            return
        }

        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Workouts')

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
            'Category'
        ])

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
                workout.category
            ])
        })

        // Generate the Excel file
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, 'workouts.xlsx')
        })
    }

    const handleClick = () => {
        // Trigger the file input click event
        fileInputRef.current.click()
    }

    //update
    const handleStatusUpdate = async (id, newStatus, newPaymentUpdate) => {
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ status: newStatus, paymentUpdate: newPaymentUpdate })
        });

        const json = await response.json();

        if (response.ok) {
            toast.success('Status and Payment Update Successfully', {
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
                workout._id === id ? { ...workout, status: newStatus, paymentUpdate: newPaymentUpdate } : workout
            );
            return updatedWorkouts;
        });

        setDublicateWorkot((prevWorkouts) => {
            const updatedWorkouts = prevWorkouts.map((workout) =>
                workout._id === id ? { ...workout, status: newStatus, paymentUpdate: newPaymentUpdate } : workout
            );
            return updatedWorkouts;
        });
    };

    //update selected items
    const updateSelectedWorkouts = async (newStatus, newPaymentUpdate) => {
        const updatePromises = selectedWorkouts.map(async (id) => {
            const response = await fetch(`/api/workouts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status: newStatus, paymentUpdate: newPaymentUpdate })
            });

            return response.json();
        });

        const updatedWorkouts = await Promise.all(updatePromises);

        toast.success('Status and Payment Update Successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

        // Update both local and original state
        setWorkouts((prevWorkouts) => {
            const updated = prevWorkouts.map((workout) =>
                selectedWorkouts.includes(workout._id) ? { ...workout, status: newStatus, paymentUpdate: newPaymentUpdate } : workout
            );
            return updated;
        });

        setDublicateWorkot((prevWorkouts) => {
            const updated = prevWorkouts.map((workout) =>
                selectedWorkouts.includes(workout._id) ? { ...workout, status: newStatus, paymentUpdate: newPaymentUpdate } : workout
            );
            return updated;
        });

        // Clear selected workouts
        setSelectedWorkouts([]);
    };

    //get selected
    const toggleSelect = (workoutId) => {
        setSelectedWorkouts((prevSelected) => {
            if (prevSelected.includes(workoutId)) {
                // Deselect if already selected
                return prevSelected.filter((id) => id !== workoutId);
            } else {
                // Select if not already selected
                return [...prevSelected, workoutId];
            }
        });
    };

    // Helper function to check if the due date is expired
    function isDueDateExpired(dueDate) {
        const today = new Date();
        const workoutDueDate = new Date(dueDate);
        return workoutDueDate < today;
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

                            <div className="con-md-3 ms-2 mt-2" value={selectedCategory} onChange={filterByCategories}>
                                <select className="form-control">
                                    <option value="all" selected>All</option>
                                    {getUniqueCategories().map((uniqueCategory) => (
                                        <option value={uniqueCategory}>{uniqueCategory}</option>
                                    ))}
                                </select>
                            </div>

                        </ul>

                        <div className="con-md-3 me-2" value={viewRecordCount} onChange={(e) => setViewRecordCount(e.target.value)}>
                            <select className="form-control">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <div className="con-md-3 me-2" value={list} onChange={(e) => filterByList(e.target.value)}>
                            <select className="form-control">
                                <option value="added">Added</option>
                                <option value="future">Future</option>
                                <option value="past">Past</option>
                            </select>
                        </div>

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

            <table className="table table-striped" >
                <thead>

                    <tr>
                        <th></th>
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

                    {records && records.map((workout) => (


                        <tr key={workout._id}>
                            <td scope="col">
                                <input
                                    type="checkbox"
                                    checked={selectedWorkouts.includes(workout._id)}
                                    onChange={() => toggleSelect(workout._id)}
                                />
                            </td>
                            <td scope="col">{workout.name}</td>
                            <td scope="col">{workout.email}</td>
                            <td scope="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Admin Account"
                                    value={workout.adminAccount}
                                />

                            </td>
                            <td scope="col">{workout.payment}</td>

                            <td scope="col">
                                <div className="con-md-3 me-2">
                                    <select
                                        className="form-control"
                                        value={workout.status}
                                        onChange={(e) => {
                                            if (selectedWorkouts.length > 0) {
                                                updateSelectedWorkouts(e.target.value);
                                            } else {
                                                handleStatusUpdate(workout._id, e.target.value);
                                            }
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                            </td>

                            <td scope="col">{workout.mobileNumber}</td>
                            <td scope="col">{workout.startDate}</td>

                            <td scope="col">
                                <span className={isDueDateExpired(workout.dueDate) ? 'dueDateExpired' : ''}>{workout.dueDate}</span>
                            </td>

                            <td scope="col">{workout.duration}</td>
                            <td scope="col">{workout.group}</td>

                            <td scope="col">
                                <input
                                    type="date"
                                    class="form-control"
                                    value={workout.paymentUpdate}
                                    onChange={(e) => {
                                        // Update the local state when the user changes the date
                                        setPaymentUpdate(e.target.value);
                                        // Call the handleStatusUpdate function with the new status and paymentUpdate
                                        if (selectedWorkouts.length > 0) {
                                            updateSelectedWorkouts(workout._id, e.target.value);
                                        } else {
                                            handleStatusUpdate(workout._id, workout.status, e.target.value);
                                        }
                                    }}
                                />
                            </td>

                            <td scope="col">
                                <Link to={`/update/${workout._id}`}>
                                    <button className='btn btn-outline-primary me-2 mt-2'><TiEdit style={{ fontSize: '20px' }} /></button>
                                </Link>
                                <button className='btn btn-danger mt-2' onClick={() => handleDelete(workout._id)}><MdDeleteForever style={{ fontSize: '20px' }} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href="#" className='page-link'
                            onClick={prePage}
                        >Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#" className='page-link'
                                    onClick={() => changeCPage(n)}
                                >{n}</a>
                            </li>
                        ))
                    }

                    <li className='page-item'>
                        <a href="#" className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
            <ToastContainer />
        </div>
    )
}