import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../style.css'

export default class CourtUpdate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reservation : {}
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

    console.log("reservation update")
    console.log(this.props.match.params.id)

    this.setState({
      reservation : {"id" : this.props.match.params.id}
    }) 
  }

  onEditCourt = (reservationId) => {
    
    fetch(`http://localhost:3001/update_court/${reservationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.reservation)
    })
  }



  handleTextChange = (e) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [e.target.name] : e.target.value
      }
    })
  }


  render() {
    return (
      <div className="container" id="formContainer">
      <div className="card card-body">
      <h4 className="card-title mx-auto">Reserve a Court</h4>
                      <div className="form">
                      <div className="row">
                      <div className="form-group ml-5 mt-4">
                          <label>Court:</label>
                              <select type="integer" onChange={this.handleTextChange} name="court">
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                      <option value="4">Four</option>
                              </select>
                      </div>
                  <div className="d-flex flex-col ml-3">
                      <div className="col">
                      <label>Date Requested:</label>
                          <input type="date" onChange={this.handleTextChange} min="2018-08-23" className="form-control" name="date" required></input>
                      </div>
                      <div className="col">
                          <label>Start Time:</label>
                          <input type="time" onChange={this.handleTextChange} onChange={this.handleTextChange} className="form-control" placeholder="Enter start time" name="startTime" required></input>
                      </div>
                      <div className="col">
                          <label>End Time:</label>
                          <input type="time" onChange={this.handleTextChange} className="form-control" placeholder="Enter end time" name="endTime"></input>
                      </div>
                       <div className="col">
                       <label>Member ID:</label>
                          <input type="integer" onChange={this.handleTextChange} className="form-control" placeholder="Enter membership ID" name="memberId" required></input>
                      </div>
                  </div>
                      <br></br>
                      <div>
                          <button className='btn btn-success mt-4 ml-3' id="rcorners1" onClick= {this.onEditCourt}><Link id="white" to = {'/'} >Update</Link></button>
                      </div></div>
              </div>
          </div>
      </div>
    )
  }
}

