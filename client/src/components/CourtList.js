import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class CourtList extends Component {

    constructor(props){
        super(props)

        this.state = {
            reservations: []
        }
    }

    populateCourt() {

        fetch('http://localhost:3001/').then((response) => response.json())
        .then((json) => {
            this.setState({
              reservations: json
        })
    })
}

    componentDidMount(){
        this.populateCourt()
    }

    onDeleteCourt = (reservationId) => {
        
        fetch('http://localhost:3001/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({reservationId : reservationId})
        })
      }

    render() {
        let courtList = this.state.reservations.map((reservation) => {
            return (
              <div className='card' key={reservation.id}>
                  <div className='card-body'>
                    <h5 className='card-title'>Court {reservation.court}</h5>
                    <h4 className='card-title' >{reservation.date} {reservation.startTime} to {reservation.endTime} </h4>
                    <h4 className='card-title' >{reservation.firstName} {reservation.lastName}</h4>
                    <h5 className='card-title'>Member {reservation.memberId}</h5>
                    <h5 className='card-title'>{reservation.email}</h5>
                  </div>
                  <div><button className='btn btn-primary'><Link to = {`/${reservation.id}`}>Update</Link></button></div>
                  <div><button className='btn btn-primary' onClick= {() => this.onDeleteCourt(reservation.id)}>Delete</button></div>
              </div>
            )
          })
        return (
    
          <div className='row'>
            <div className='col-md-9'>
              <div className='card-columns'>
              {courtList}
              </div>
            </div>
          </div>
        )
      }
    }
