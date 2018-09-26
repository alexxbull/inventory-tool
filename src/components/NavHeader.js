import React from 'react'
import { Link } from 'react-router-dom'

const navHeader = (props) => {
    return (
        <header>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Add Item</Link></li>
                    <li><Link to="/viewitems">View Items</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default navHeader;