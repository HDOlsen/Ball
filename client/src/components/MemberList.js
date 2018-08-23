import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../style.css'

export default class MemberList extends Component {


  constructor(props) {
    super(props)

    this.state = {
      members : []
    }
  }

    populateMember() {

        fetch('http://localhost:3001/members').then((response) => response.json())
        .then((json) => {
            this.setState({
              members: json
        })
    })
}

    componentDidMount(){
        this.populateMember()
    }


    onDeleteMember = (memberId) => {
        
        fetch('http://localhost:3001/members', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({memberId : memberId})
        })
      }

          



  render() {
    let memberList = this.state.members.map((member) => {
        return (
          <div className='card card-group membercard mt-3' key={member.id}>
              <div className='card-body'>
                <h4 className='card-title' >{member.firstName} {member.lastName}</h4>
                <h5 className='card-title'>Member {member.id}</h5>
                <h6 className='card-title'>{member.email}</h6>
              </div>
              <img className='card-img-top member mt-1' src={member.photo} alt={member.lastName} />
              <div className="d-flex flex-row justify-content-center">
              <div><button className='btn btn-success' id="rcorners1"><Link id="white" to = {`/member/${member.id}`}>Update</Link></button></div>
              <div><button className='btn btn-success' id="rcorners1" onClick= {() => this.onDeleteMember(member.id)}>Delete</button></div>
          </div>
        </div>
        )
      })
    return (

      <div className='d-flex flex-row justify-content-md-center'>
        <div className='col-md-7'>
          <div className='card-columns'>
          {memberList}
          </div>
        </div>
      </div>
    )
  }
}
