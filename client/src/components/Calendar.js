import React, {Component} from 'react'
import MemberList from './MemberList';
import CourtList from './CourtList';

export default class Calendar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          court: {}
        }
      }
    
      componentWillMount() {
        console.log("Reservation Component Running")
      }
    
      onSaveCourt = () => {
        
        fetch('http://localhost:3001/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.court)
        })
      }

      handleTextChange = (e) => {
        this.setState({
          court: {
            ...this.state.court,
            [e.target.name] : e.target.value
          }
        })
      }

    render(){
        return (
           
<div className="container" id="formContainer">
    <div className="card card-body">
    <h4 className="card-title">Reserve a Court</h4>
                    <div className="form">
                    <div className="row">
                    <div className="form-group">
                        <label>Court:</label>
                            <select type="integer" onChange={this.handleTextChange} name="court">
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                            </select>
                    </div>
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
                    <br></br>
                    <div>
                        <button className='btn btn-primary' onClick= {this.onSaveCourt}>Submit</button>
                    </div>
                    <div>
                        <input type="reset" value="Clear" className='btn btn-primary'></input>
                </div>
            </div>
        </div>
    </div>
    <CourtList />
    <MemberList />
</div>



        )
    }
}