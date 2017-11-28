import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
const uuid = require('uuid/v4');

import { firebase } from '../firebase/firebase'

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      User: {
        uuid: '',
        fName: '',
        lName: '',
        hourly: true,
        fica: 0,
        federal: 0,
        state: 0
      },
      redirect: false
    }
  }

  onFnameChange = (event) => {
    let user = {...this.state.User }
    user.fName = event.target.value
    this.setState({ User: user })
  }

  onFormSubmit = (event) => {
    //event.preventDefault()
    let uid = uuid();
    let user = {...this.state.User }
    user.uuid = uid;
    this.setState({ User: user })
    // if fields aren't empty
    // TODO: Add form validation
    firebase.database().ref('/employees').push({
      first_name: this.state.User.fName,
      last_name:  this.state.User.lName,
      hourly: this.state.User.hourly,
      fica: this.state.User.fica,
      federal: this.state.User.federal,
      state: this.state.User.state
    })
    console.log('USER: ', this.state.User)
  }

  onLnameChange = (event) => {
    var user = {...this.state.User }
    user.lName = event.target.value
    this.setState({ User: user })
  }

  onHourlyChecked = (event) => {
    var user = {...this.state.User }
    user.hourly ? user.hourly = false : user.hourly = true
    this.setState({ User: user })
  }

  onSalaryChecked = (event) => {
    var user = {...this.state.User }
    user.salary ? user.salary = false : user.salary = true
    this.setState({ User: user })
  }

  onFicaChanged = (event) => {
    var user = {...this.state.User }
    user.fica = event.target.value
    this.setState({ User: user })
  }

  onFederalChanged = (event) => {
    var user = {...this.state.User }
    user.federal = event.target.value
    this.setState({ User: user })
  }

  onStateChanged = (event) => {
    var user = {...this.state.User }
    user.state = event.target.value
    this.setState({ User: user })
  }

  onPayrollClicked = () => {
    // go to the payroll page
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect path to='/payroll'/>
    }
    return (
      <div className="setup-container">
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input onChange={this.onFnameChange} type="text" className="form-control" placeholder="Enter employee first name"></input>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input onChange={this.onLnameChange} type="text" className="form-control" placeholder="Enter employee last name"></input>
          </div>
          <div className="form-row">
            <div className="form-group fields col-md-2">
              <div className="form-check">
                <label className="form-check-label">
                <input className="form-check-input" onChange={this.onHourlyChecked} disabled={this.state.User.salary} defaultChecked={this.state.User.hourly} type="checkbox" value=""></input>
                  &nbsp;Hourly
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                <input className="form-check-input" onChange={this.onSalaryChecked} disabled={this.state.User.hourly} type="checkbox" value=""></input>
                  &nbsp;Salary
                </label>
              </div>
            </div>
          </div>
            <div className="form-group fields col-md-4">
              <label>Fica	&#37;
                <input onChange={this.onFicaChanged} className="form-control" type="number" step="0.0001" placeholder="0.0"></input>
              </label>
            </div>
            <div className="form-group fields col-md-4">
              <label>Federal &#37;
                <input onChange={this.onFederalChanged} className="form-control" type="number" step="0.0001" placeholder="0.0"></input>
              </label>
            </div>
            <div className="form-group fields col-md-4">
              <label>State &#37;
                <input onChange={this.onStateChanged} className="form-control" type="number" step="0.0001" placeholder="0.0"></input>
              </label>
            </div>
            <div className="btn-toolbar mb-2"> 
              <div className="btn-group mr-2">
                <button type="submit" className="btn btn-primary">Add Employee</button>
              </div>
              <div className="btn-group mr-2">
                <button onClick={this.onPayrollClicked}type="submit" className="btn btn-secondary">Payroll</button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}