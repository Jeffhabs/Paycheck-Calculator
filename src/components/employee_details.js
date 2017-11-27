import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (!this.props.employee) {
      return <div className='employee-details col-md-4'>
        <h4>Select an employee to view details.</h4>
      </div>
    }
    let type = (this.props.employee.hourly) ? 'hourly' : 'salary'
    return (
      <div className='employee-details col-md-4'>
        <h4>Name: {`${this.props.employee.first_name} ${this.props.employee.last_name}`}</h4>
          <p>Type: {`${type}`}</p>
          <p>FICA%: {this.props.employee.fica}</p>
          <p>Federal%: {this.props.employee.federal}</p>
          <p>State%: {this.props.employee.state}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    employee: state.employee
  }
}

export default connect(mapStateToProps)(EmployeeDetails);