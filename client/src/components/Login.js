import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../style.css';
const cookies = new Cookies()


export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      admin : {}
    }

    if(this.props.logged_in){
      this.props.history.replace("/")
    }
  }

  componentWillReceiveProps(nextProps){

    if(!this.props.logged_in && nextProps.logged_in){
      this.props.history.replace("/")
    }
  }

  componentWillMount() {
  
  }

  onValidateLogin = (e) => {

    e.preventDefault()
    
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.admin)
      })
    .then(response => response.json())
    .then(json => {
     

      if(json && json.success && json.token && json.userID ){
        var {token, success, userID} = json
        cookies.set('tennis_token', token, { path: '/' })
        cookies.set('tennis_userID', userID, { path: '/' })
        this.props.setLoggedInTrue()
        this.props.history.replace('/')
      }
      else{
      
        this.props.history.replace('/home')

      }
      

    
        
        // redirect the user to some route 
        
        
        

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
    console.log(this.props)
    return (
      <div className="login">
      <div className="login-page">
        <div className="form">
          <form className="login-form">
          <input type="text" onChange={this.handleTextChange} name="userName" placeholder="Enter username"></input>
          <input type="text" onChange={this.handleTextChange} name="password" placeholder="Enter password"></input>
          <div>
            <button onClick= {this.onValidateLogin}>Submit</button>
          </div>
          <div className="d-flex flex-row">
              <p className="message">Not registered?</p>
              <p className="message pl-2"><Link to='/register'>Create an account</Link></p>
          </div>
          </form>
        </div>
      </div>
    </div>

    );
  }
}