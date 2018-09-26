import React from 'react'

const tableHeader = (props) => {
    return (
        <tr className="tableheader">
            <th onClick={props.click("name")}>Name</th>
            <th onClick={props.click("price")}>Price</th>
            <th onClick={props.click("color")}>Color</th>
            <th onClick={props.click("condition")}>Condition</th>
        </tr>
    )
}

export default tableHeader;