import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// const serverURL = 'http://localhost:8080'
const serverURL = 'https://still-caverns-97420.herokuapp.com'

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            name: '',
            password: '',
            register: false,
            formTitle: "Login",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // update the value the user has entered
    handleChange(e) {
        const name = e.target.name
        this.setState({ [name]: e.target.value });
    }

    // handle register button clicked
    handleRegister(e) {
        e.preventDefault()

        let bool = true
        if (e.target.name === "login")
            bool = false

        if (bool)
            this.setState({
                name: "",
                formTitle: "Register",
                register: bool,
            })
        else
            this.setState({
                formTitle: "Login",
                register: bool,
            })
    }

    handleSubmit(e) {
        // stop form submitting
        e.preventDefault()

        // retrieve request variables
        const { email, name, password } = this.state;

        // send the user's information to the server
        fetch(`${serverURL}/users`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.UserID) {
                    this.props.loadUser(user.UserID)
                    this.props.history.push(`/profile/${user.UserID}/viewitems`)
                }
                else {
                    console.log("error receiving data")
                }
            })
    }

    render() {
        const { email, formTitle, name, password, register } = this.state

        return (
            <div className="center">
                <form onSubmit={this.handleSubmit} >
                    <div>
                        <h1 className="form-title" htmlFor="form-title">{formTitle}</h1>
                        {/* render name form if registering */
                            register
                                ?
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" placeholder="Name" name="name" value={name} onChange={this.handleChange} required />
                                </div>
                                :
                                null
                        }

                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} required />


                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} required />

                        <div className="middle">
                            <button type="submit">Submit</button>
                            {/* hide register button on register page and show route to login on register page */
                                !register
                                    ?
                                    <button className="register-btn" onClick={this.handleRegister}>Register</button>
                                    :
                                    <button className="register-btn" name="login" onClick={this.handleRegister}>Login</button>
                            }
                        </div>
                    </div>
                </form >
            </div>
        )
    }
}

export default withRouter(UserForm)