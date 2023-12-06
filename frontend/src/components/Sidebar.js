import React from 'react'

export default function Sidebar() {
    return (
        <div className='bg-white  p-2'>

            <div className='m-2'>
                <i className='bi bi-bootstrap-fill me-2 fs-4'></i>
                <span className='brand-name fs-4'>Yoursaf</span>
            </div>

            <hr  className='text-dark'/>

            <div className='list-group list-group-flush'>

                <a className='list-group-item  list-group-item-action py-2'>
                    <i className='bi bi-house fs-5 me-3'></i>
                    <span className='fs-5'>Home</span>
                </a>
                
                <a className='list-group-item  list-group-item-action py-2'>
                    <i className='bi bi-house fs-5 me-3'></i>
                    <span className='fs-5'>Home</span>
                </a>

                <a className='list-group-item list-group-item-action py-2'>
                    <i className='speedometer2 fs-4 me-3'></i>
                    <span className='fs-5'>Customer</span>
                </a>
                
                <a className='list-group-item list-group-item-action py-2'>
                    <i className='speedometer2 fs-4 me-3'></i>
                    <span className='fs-5'>payment</span>
                </a>

            </div>
        </div>
    )
}
