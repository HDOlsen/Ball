import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class CourtList extends Component {

    constructor(props){
        super(props)

        this.state = {
            reservations: [],
            showNav: false,
            navLink: ''
        }
    }

      populateCourt = () =>  {

      var gotToken = cookies.get('tennis_token')
      var gotUser = cookies.get('tennis_userID')


      if(gotToken){
        fetch('http://localhost:3001/', {
          method: 'GET',
          headers: {
            'Authorization': gotToken
          }
        }).then((response) => response.json())
          .then((json) => {
              this.setState({
                reservations: json
          })
        })
        
      }
      else{
      
        this.props.history.replace("/home")
       
      }
        
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
              <div className='card' id="rcorners2">
                    <div className='card-body'>
                    <h3 className='card-title'>Court {reservation.court}</h3>
                    <h6 className='card-title' >{reservation.date}</h6>
                    <h6 className='card-title' >{reservation.startTime} to {reservation.endTime}</h6>
                    <h4 className='card-title' >{reservation.firstName} {reservation.lastName}</h4>
                    <h5 className='card-title pb-4'>Member {reservation.memberId}</h5>
                    <h5 className='card-title'>{reservation.email}</h5>
                  </div>
                  <div className="d-flex flex-row">
                  <a id="rcorners1" className='btn btn-success' href={`/${reservation.id}`}>Update</a>
                  <a id="rcorners1" className='btn btn-success' onClick= {() => this.onDeleteCourt(reservation.id)}>Delete</a>
               </div> 
              </div>
            )
          })
        return (
    
          <div className='d-flex flex-row flex-wrap justify-content-center mt-3 memberres2'>
            <div className='col-md-9'>
              <div className='card-columns'>
              {courtList}
              </div>
            </div>
          </div> 
        )
      }
    }
