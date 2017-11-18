import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from '../components/LandingPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={ LandingPage }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

