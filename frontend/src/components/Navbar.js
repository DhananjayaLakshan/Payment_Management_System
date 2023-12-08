import { FiAlignRight } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar({ Toggle }) {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogOut = () => {
        logout()
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    
                    {user &&
                        <i className="btn btn-primary m-2" onClick={Toggle}><FiAlignRight /></i>
                    }

                    <Link to='/'>
                        <a style={{ textDecoration: 'none' }} class="navbar-brand">Navbar</a>
                    </Link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 " >
                            <li class="nav-item">
                                <Link to='/'>
                                    <a class="nav-link active" aria-current="page"><FaHome /></a>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>

                        {!user && (
                            <div>
                                <Link to='/login'>
                                    <button class="btn btn-outline-primary me-2" type="submit">Login</button>
                                </Link>

                                <Link to='/register'>
                                    <button class="btn btn-outline-primary me-2" type="submit">Sign in</button>
                                </Link>
                            </div>
                        )}

                        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success" type="submit">Search</button> */}

                        {user && (
                            <form class="d-flex" role="search" onSubmit={handleLogOut}>
                                <span className="me-3" style={{fontSize:'18px', fontWeight:'bold'}}>{user.email}</span>
                                <button class="btn btn-outline-primary ms-2" type="submit"><LuLogOut /></button>
                            </form>
                        )}


                    </div>

                </div>
            </nav>
        </>
    )
}
