import React from 'react'
import { Link } from 'react-router-dom'

const item = (props) => {
    return (
        <tr className="itemrow">
            <td>{props.item.Name}</td>
            <td>{props.item.Price}</td>
            <td>{props.item.Color}</td>
            <td>{props.item.Condition}</td>
            <td><Link to="/edititem">
                <button className="edit-btn" onClick={props.edit(JSON.stringify(props.item))}>Edit</button>
            </Link>
            </td>
            <td><button className="delete-btn" onClick={props.delete(props.item.ID)}>Delete</button></td>
        </tr>
    )
}

export default item;