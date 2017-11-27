import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LandingPage from '../components/LandingPage'
import PayrollPage from '../components/PayrollPage'
import EmployeeDetails from '../components/employee_details'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/payroll" component={ PayrollPage } /> 
            <Route path="/" component={ LandingPage }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

