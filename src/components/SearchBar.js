import React from 'react'

const searchBar = (props) => {
    return (
        <div className="middle">
            <input className="searchbar" type="text" placeholder="Search by name" onChange={props.change} />
        </div>
    )
}

export default searchBar;