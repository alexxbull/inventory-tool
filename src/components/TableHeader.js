import React from 'react'

const tableHeader = (props) => {
    return (
        <tr className="tableheader">
            <th onClick={props.click("Name")}>Name</th>
            <th onClick={props.click("Price")}>Price</th>
            <th onClick={props.click("Color")}>Color</th>
            <th onClick={props.click("Condition")}>Condition</th>
        </tr>
    )
}

export default tableHeader;