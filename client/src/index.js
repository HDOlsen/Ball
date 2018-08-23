import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Calendar from './components/Calendar';
import Member from './components/Member';
import MemberList from './components/MemberList';
import MemberUpdate from './components/MemberUpdate';
import CourtUpdate from './components/CourtUpdate';
import Login from './components/Login';
import AdminCreate from './components/AdminCreate';
import Profile from './components/Profile';
import Register from './components/Register';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from './Page.js'

import Cookies from 'universal-cookie'
const cookies = new Cookies()


const CourtListPage = ( props ) => {
  
  return <Page {...props} ComponentToRender={Calendar} />
}
const CourtUpdatePage = ( props ) => {
  
  return <Page {...props} ComponentToRender={CourtUpdate} />
}
const MemberUpdatePage = ( props ) => {
  
  return <Page {...props} ComponentToRender={MemberUpdate} />
}
const MemberListPage = ( props ) => {
  
  return <Page {...props} ComponentToRender={MemberList} />
}
const MemberPage = ( props ) => {
  
  return <Page {...props} ComponentToRender={Member} />
}

const AdminCreatePage = ( props ) => {
  
  return <Page {...props} ComponentToRender={AdminCreate} />
}

const ProfilePage = ( props ) => {
  
  return <Page {...props} ComponentToRender={Profile} />
}

const RegisterPage = ( props ) => {
  
  return <Page {...props} ComponentToRender={Register} />
}

const LoginPage = ( props ) => {
  
  return <Page {...props} ComponentToRender={Login} />
}




ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route exact path= '/home' render = {LoginPage} />
        <Route exact path= '/register' render = {RegisterPage} />
        <Route exact path= '/profile' render = {ProfilePage} />
        <Route exact path= '/admin' render = {AdminCreatePage} />
        <Route exact path= '/member' render = {MemberPage} />
        <Route exact path= '/list' render = {MemberListPage} />
        <Route exact path = '/member/:id' render = {MemberUpdatePage} />
        <Route exact path = '/:id' render = {CourtUpdatePage} />
        <Route exact path= '/' render = {CourtListPage} />
      </Switch> 
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();





