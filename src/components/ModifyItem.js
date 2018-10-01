import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const serverURL = 'http://localhost:8080'
// const serverURL = 'https://still-caverns-97420.herokuapp.com'

class ModifyItem extends Component {
    constructor(props) {
        super(props)

        // if item exists then editing item so load the item's properties
        if (props.item) {
            const item = JSON.parse(props.item)
            this.state = {
                ID: item.ID,
                Name: item.Name,
                Price: item.Price,
                Color: item.Color,
                Condition: item.Condition,
                UserID: props.UserID,
                loadItems: props.reloadItems
            }
        }
        // else item doesn't exist so adding item with default properties
        else {
            this.state = {
                ID: '',
                Name: '',
                Price: '',
                Color: '',
                Condition: '',
                UserID: props.UserID,
                loadItems: props.reloadItems
            }
        }

        this.handleChange = this.handleChange.bind(this)
    }

    // update the value the user has entered
    handleChange(e) {
        const name = e.target.name
        this.setState({ [name]: e.target.value });
    }

    // send the appropriate request to the server for either adding or editing item
    handleSubmit = (e) => {
        // stop form submitting
        e.preventDefault()

        // retrieve request variables
        const { ID, Name, Price, Condition, UserID } = this.state;
        let endpoint = ''
        let httpMethod = ''
        let Color = this.state.Color.charAt(0).toUpperCase() + this.state.Color.substr(1); // uppercase first letter in Color

        // if ID is 0, a placeholder item id, then add item
        if (ID === '') {
            endpoint = `${serverURL}/items/add`
            httpMethod = 'POST'
        }
        // if ID is not known, add item
        else {
            endpoint = `${serverURL}/items/edit`
            httpMethod = 'PUT'
        }
        // send the appropiate request
        fetch(endpoint, {
            method: httpMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'ID': ID.toString(),
                'Name': Name,
                'Price': Price.toString(),
                'Color': Color,
                'Condition': Condition,
                'UserID': UserID.toString()
            })
        })
            // refresh items list and return to home page
            .then(() => {
                this.state.loadItems()
                this.props.history.push(`/profile/${this.state.UserID}/viewitems`)
            })
    }

    render() {
        const { Name, Price, Color, Condition } = this.state

        return (
            <div className="middle">
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <div>
                        <label htmlFor="Name">Name:</label>
                        <input type="text" name="Name" value={Name} onChange={this.handleChange} required />

                        <label htmlFor="Price">Price:</label>
                        <input type="number" name="Price" min="0.01" max="99999999" step="0.01" value={Price} onChange={this.handleChange} required />

                        <label htmlFor="Color">Color:</label>
                        <input type="text" name="Color" value={Color} onChange={this.handleChange} required />

                        <label htmlFor="Condition">Condition:</label>
                        <select name="Condition" value={Condition} onChange={this.handleChange} required>
                            <option hidden defaultValue></option>
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Gently Used">Gently Used</option>
                        </select>

                        <div className="middle">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form >
            </div>
        )
    }
}

export default withRouter(ModifyItem)