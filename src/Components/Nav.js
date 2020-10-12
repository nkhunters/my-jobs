import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Nav = (props) => {
    return (
        <div className="bs-component">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to='/1' className="navbar-brand">MyJobs</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/1" className="nav-link">View Jobs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/post-job" className="nav-link" href="#">Post Job</NavLink>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
