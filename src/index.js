import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={Navbar} />
      </Switch>
    </div>
  </Router>
  , document.getElementById('root'));
