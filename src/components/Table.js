import React, { Component } from 'react';
import Item from './Item'
import SearchBar from './SearchBar'
import TableHeader from './TableHeader'

class Table extends Component {
    // reload list of items when table renders
    componentDidMount() {
        this.props.reload();
    }

    render() {
        const { edit, items, search, sort } = this.props

        return (
            <div className="tableandsearch">
                <SearchBar change={search} />
                <table className="itemstable">
                    <tbody>
                        <TableHeader click={sort} />
                        {/* Display list of items */
                            items.map(item => {
                                return <Item
                                    key={item.ID}
                                    item={item}
                                    edit={edit}
                                    delete={this.props.delete} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table