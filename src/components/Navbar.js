import React from 'react'
import { Link, NavLink ,withRouter} from 'react-router-dom'

const Navbar = (props) => {

    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <Link className="brand-logo" to="/">Xuhu's Blogs</Link>
                <ul className="right">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink exact to="/about">About</NavLink></li>
                    <li><NavLink exact to="/contact">Contact</NavLink></li>
                </ul>
            </div>
        </nav>

    )
}

export default withRouter(Navbar)
