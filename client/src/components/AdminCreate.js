import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AdminCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      admin : {}
    }
  }

  componentWillMount() {
    console.log("Admin Component Running")
  }

  onSaveAdmin = () => {
    
    fetch('http://localhost:3001/admin', {
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
      }
    })
  }


  render() {
    return (
        <div className="container" id="formContainer">
        <div className="card card-body">
            <h4 className="card-title mx-auto">Admin Profile</h4>
            <br></br>
            <div className="form-group">
              <label>Primary Phone:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="phone" placeholder="Enter phone number"></input>
            </div>
            <div className="form-group">
              <label>Employee Type:</label>
            <select onChange={this.handleTextChange} name="adminType">
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="seasonal">Seasonal</option>
                <option value="contract">Contractor</option>
            </select>
            </div>
            <div className="form-group">
              <label>Personal Photo:</label>
              <input className="form-control" onChange={this.handleTextChange} type="url" name="photo" placeholder="Upload file"></input>
            </div>
              <div>
              <button className='btn btn-success' onClick= {this.onSaveAdmin}><Link id="white" to = {'/'}>Submit</Link></button>
              </div>
    </div>
</div>
    )
  }
}