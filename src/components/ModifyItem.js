import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class ModifyItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ID: props.ID,
            name: props.Name,
            price: props.Price,
            color: props.Color,
            condition: props.Condition,
            userID: "1", // PLACEHOLDER UNTIL USERS/LOGIN IS IMPLEMENTED
            loadItems: props.reloadItems
        }
        this.handleChange = this.handleChange.bind(this)
    }

    // update the value the user has entered
    handleChange(e) {
        const name = e.target.name
        this.setState({ [name]: e.target.value });
    }

    // send the appropriate request to the server
    handleSubmit = (e) => {
        // stop form submitting
        e.preventDefault()

        // retrieve request variables
        const { name, price, condition, userID } = this.state;
        let endpoint = ''
        let httpMethod = ''
        let ID = this.state.ID
        let color = this.state.color.charAt(0).toUpperCase() + this.state.color.substr(1); // uppercase first letter in color

        // if ID is known, edit item
        if (ID) {
            endpoint = 'https://still-caverns-97420.herokuapp.com/items/edit'
            httpMethod = 'PUT'
        }
        // if ID is not known, add item
        else {
            ID = "0"   // dummy value for ID, database will determine actual ID value
            endpoint = 'https://still-caverns-97420.herokuapp.com/items/add'
            httpMethod = 'POST'
        }
        // send the appropiate request
        fetch(endpoint, {
            method: httpMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ID": ID.toString(),
                "Name": name,
                "Price": price.toString(),
                "Color": color,
                "Condition": condition,
                "UserID": userID,
            })
        })
            // refresh items list and return to home page
            .then(() => {
                this.state.loadItems()
                this.props.history.push('/viewitems')
            })
    }

    render() {
        const { name, price, color, condition } = this.state
        return (
            <form className="itemform" onSubmit={this.handleSubmit.bind(this)} >
                <ul className="itemform-wrapper">
                    <li class="itemform-row">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={name} onChange={this.handleChange} required />
                    </li>
                    <li class="itemform-row">
                        <label htmlFor="price">Price:</label>
                        <input type="number" name="price" min="0.01" max="99999999" step="0.01" value={price} onChange={this.handleChange} required />
                    </li>

                    <li class="itemform-row">
                        <label htmlFor="color">Color:</label>
                        <input type="text" name="color" value={color} onChange={this.handleChange} required />
                    </li>

                    <li class="itemform-row">
                        <label htmlFor="condition">Condition:</label>
                        <select name="condition" value={condition} onChange={this.handleChange} required>
                            <option hidden defaultValue></option>
                            <option value="New">New</option>
                            <option value="Like-New">Like New</option>
                            <option value="Gently-Used">Gently Used</option>
                        </select>
                    </li>
                    <li class="itemform-row">
                        <button type="submit">Submit</button>
                    </li>
                </ul>
            </form >
        )
    }

}

export default withRouter(ModifyItem)