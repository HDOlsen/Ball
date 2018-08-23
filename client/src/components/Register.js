import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

export default class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      admin : {}
    }
  }

  componentWillMount() {
    console.log("Register Component Running")
  }

  onRegisterUser = (e) => {
    e.preventDefault()
   
    
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.admin)
    })
  }


  handleTextChange = (e) => {
    this.setState({
      admin: {
        ...this.state.admin,
        [e.target.name] : e.target.value
      },
    })
  }

  render() {
    return (
          <div className="registered">
          <div className="login-page">
          <div className="formreg">
          <form className="register-form">
          <input type="text" onChange={this.handleTextChange} name="firstName" placeholder="Enter first name"></input>
          <input type="text" onChange={this.handleTextChange} name="lastName" placeholder="Enter last name"></input>
          <input type="text" onChange={this.handleTextChange} name="email" placeholder="Enter email"></input>
          <input type="text" onChange={this.handleTextChange} name="userName" placeholder="Enter username"></input>
          <input type="text" onChange={this.handleTextChange} name="password" placeholder="Enter password"></input>
          
          <div>
            <button onClick= {this.onRegisterUser}>Create</button>
          </div>
            <p className="message">Already registered? <Link to='/home'>Sign In</Link></p>
            </form>
        </div>
    </div>
  </div>
)}}