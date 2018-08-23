import React from "react";
import './style.css'
import Sidebar from "react-sidebar";
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'

import Cookies from 'universal-cookie'
const cookies = new Cookies()
class Page extends React.Component {
  constructor(props) {

    super(props);
    console.log(props)
    this.state = {
      sidebarOpen: false,
      loggedIn: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
}

 componentWillReceiveProps(nextProps){
  console.log(nextProps)
  
 }

 componentDidUpdate(){
     console.log(this.state)
 }


  componentDidMount(){
    var gotToken = cookies.get('tennis_token')
    var gotUser = cookies.get('tennis_userID')
    
    if(gotToken && gotUser){
      fetch(`http://localhost:3001/authenticate/${gotUser}`, {
      method: 'GET',
      headers: {
        'Authorization': gotToken
      }
      })
    .then((response) => { 
      return response.json() 
    }).then((json)=>{
      if(json && json.user && !this.state.loggedIn){
    
        this.setState({loggedIn: true })
    
      }
      else{
        if(json && !json.user || !json){
          this.setState({loggedIn: false})
          this.props.history.replace("/home")
        }
      }

    
    })
  }
  }

  logout(){
    cookies.remove('tennis_token', { path: '/' })  
    cookies.remove('tennis_user', { path: '/' })  
    this.setState({loggedIn: false, sidebarOpen: false})
    this.props.history.replace("/home")
}

  setLoggedInTrue(){
    this.setState({
        loggedIn: true
    })
    
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {

    const {ComponentToRender} = this.props
    
    return (
      <Sidebar
        sidebar={<b><html className="sidebar"> <body className="bar">
        <div id="mySidenav" className="sidenav">
        <Link to='/'>Reservations</Link>
        <Link to='/list'>Members</Link>
        <Link to='/member'>New Member</Link>
        <Link to='/profile'>My Profile</Link>
        <Link to='/club'>My Club</Link>
        <button onClick={this.logout.bind(this)}>logout</button>
      </div></body></html></b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "" } }}
      >
        {this.state.loggedIn? <button onClick={() => this.onSetSidebarOpen(true)}>
          Menu
        </button> : null}
        <ComponentToRender setLoggedInTrue={this.setLoggedInTrue.bind(this)} logged_in={this.state.loggedIn} {...this.props} />
      </Sidebar>
    );
  }
}
 
export default withRouter(Page)