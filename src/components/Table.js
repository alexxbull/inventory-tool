import React from 'react';
import Item from './Item'
import SearchBar from './SearchBar'
import TableHeader from './TableHeader'

const table = (props) => {
    return (
        <div className="tableandsearch">
            <SearchBar change={props.search} />
            <table className="itemstable">
                <tbody>
                    <TableHeader click={props.sort} />
                    {/* Display list of items */
                        props.items.map(item => {
                            return <Item
                                key={item.ID}
                                item={item}
                                edit={props.edit}
                                delete={props.delete} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default table