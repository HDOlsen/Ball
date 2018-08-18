import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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
          <div className='card' key={member.id}>
              <img className='card-img-top' src={member.photo} alt={member.lastName} />
              <div className='card-body'>
                <h4 className='card-title' >{member.firstName} {member.lastName}</h4>
                <h5 className='card-title'>Member {member.id}</h5>
                <h5 className='card-title'>{member.email}</h5>
              </div>
              <div><button className='btn btn-primary'><Link to = {`/member/${member.id}`}>Update</Link></button></div>
              <div><button className='btn btn-primary' onClick= {() => this.onDeleteMember(member.id)}>Delete</button></div>
          </div>
        )
      })
    return (

      <div className='row'>
        <div className='col-md-9'>
          <div className='card-columns'>
          {memberList}
          </div>
        </div>
      </div>
    )
  }
}
