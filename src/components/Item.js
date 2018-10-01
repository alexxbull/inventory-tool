import React from 'react'
import { Link } from 'react-router-dom'

const item = (props) => {
    const { Color, Condition, ID, Name, Price, UserID } = props.item

    return (
        <tr className="itemrow">
            <td>{Name}</td>
            <td>{Price.toFixed(2)}</td>
            <td>{Color}</td>
            <td>{Condition}</td>
            <td><Link to={`/profile/${UserID}/edititem`}>
                <button className="edit-btn" onClick={props.edit(JSON.stringify(props.item))}>Edit</button>
            </Link>
            </td>
            <td><button className="delete-btn" onClick={props.delete(ID)}>Delete</button></td>
        </tr>
    )
}

export default item;