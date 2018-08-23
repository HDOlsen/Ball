import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class MemberUpdate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      member : {}
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

    console.log("member update")
    console.log(this.props.match.params.id)

    this.setState({
      member : {"id" : this.props.match.params.id}
    }) 
  }

  onEditMember = (memberId) => {
    
    fetch(`http://localhost:3001/member/${memberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.member)
    })
  }



  handleTextChange = (e) => {
    this.setState({
      member: {
        ...this.state.member,
        [e.target.name] : e.target.value
      }
    })
  }


  render() {
    return (
        <div className="container" key={this.state.member.id} id="formContainer">
        <div className="card card-body">
            <h4 className="card-title">Member Profile</h4>
        <div className="form">
          <div className="row">
            <div className="col">
            <label>First Name:</label>
              <input type="text" onChange={this.handleTextChange} className="form-control" placeholder="Enter first name" name="firstName"></input>
            </div>
            <div className="col">
            <label>Last Name:</label>
              <input type="text" onChange={this.handleTextChange} className="form-control" placeholder="Enter last name" name="lastName"></input>
            </div>
          </div>
        </div>
            <br></br>
            <div className="form-group">
              <label>Home Address:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="address" placeholder="Enter address"></input>
            </div>
            <div className="form-group">
              <label>City:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="city" placeholder="Enter city"></input>
            </div>
            <div className="form-group">
              <label>State:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="state" placeholder="Enter state"></input>
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="zip" placeholder="Enter zip code"></input>
            </div>
            <div className="form-group">
              <label>Primary Phone:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="phone" placeholder="Enter phone number"></input>
            </div>
            <div className="form-group">
              <label>Primary Email:</label>
              <input className="form-control" type="text" onChange={this.handleTextChange} name="email" placeholder="Enter email"></input>
            </div>
            <div className="form-group">
              <label>Membership Type:</label>
            <select onChange={this.handleTextChange} name="memType">
                <option value="social">Social</option>
                <option value="athletic">Athletic</option>
                <option value="tennis">Tennis</option>
                <option value="elite">Tennis Elite</option>
            </select>
            </div>
            <div className="form-group">
              <label>Member Photo:</label>
              <input className="form-control" onChange={this.handleTextChange} type="url" name="photo" placeholder="Upload file"></input>
            </div>
              <div>
              <button className='btn btn-success' id="rcorners1" onClick= {() => this.onEditMember(this.state.member.id)}><Link id="white" to = {'/'}>Update</Link></button>
              </div>
    </div>
</div>
    )
  }
}

