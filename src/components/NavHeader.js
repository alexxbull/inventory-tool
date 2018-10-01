import React from 'react'
import { Link } from 'react-router-dom'

const navHeader = (props) => {
    const { SignOut, UserID } = props
    return (
        <header>
            <nav className="navbar">
                <ul>
                    <div className="middle">
                        <li><Link to={`/profile/${UserID}/additem`}>Add Item</Link></li>
                        <li><Link to={`/profile/${UserID}/viewitems`}>View Items</Link></li>
                    </div>
                    <div style={{ float: 'right' }}>
                        <li><Link to={`/`} onClick={SignOut}>Sign Out</Link></li>
                    </div>
                </ul>
            </nav>
        </header >
    )
}

export default navHeader;