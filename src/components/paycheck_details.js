import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'

class PaycheckDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0
    }
  }

  render() {
    if (!this.props.employee) {
      return <div className='paycheck-details col-md-4'>
      </div>
    }
    let typeDisplay = this.props.employee.hourly ? 'Hours' : 'Salary'
    return (
      <div className='paycheck-details col-md-4'>
        <div className='row'>
          <div className='hours col-md-12'>
            <div className='input-group'>
              <span className='input-group-addon' id='basic-addon3'>{typeDisplay}</span>
              <input type='number' className='form-control' placeholder='Enter hours/salary' aria-describedby='basic-addon3'></input>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='fields col-md-9'>
            Gross paycheck
          </div>
          <div className='numbers col-md-3'>
            100
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employee: state.employee
  };
}

export default connect(mapStateToProps)(PaycheckDetails)