import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './style.css';
// import App from './App';
import Calendar from './components/Calendar';
import Member from './components/Member';
import MemberUpdate from './components/MemberUpdate';
import CourtUpdate from './components/CourtUpdate';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route exact path= '/' component = {Calendar} />
        <Route exact path = '/:id' component = {CourtUpdate} />
        <Route path= '/member' component = {Member} />
        <Route path = '/member/:id' component = {MemberUpdate} />
      </Switch>
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();


