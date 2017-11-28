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

  renderInput = () => {
    if (!this.props.employee.hourly) {
      return (
        <div className='row'>
          <div className='hours col-md-12'>
            <div className='input-group'>
              <span className='input-group-addon' id='basic-addon3'>Salary</span>
              <input type='number' className='form-control' placeholder='Enter salary' aria-describedby='basic-addon3'></input>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='row'>
        <div className='hours col-md-6'>
          <div className='input-group'>
            <span className='input-group-addon' id='basic-addon3'>Hours</span>
            <input type='number' className='form-control'  aria-describedby='basic-addon3'></input>
          </div>
        </div>
        <div className='hours col-md-6'>
          <div className='input-group'>
            <span className='input-group-addon'>$</span>
            <input type='number' className='form-control' aria-label='Amount (to the nearest dollar)'></input>
            <span className='input-group-addon'>.00</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.employee) {
      return <div className='paycheck-details col-md-4'>
        <h4>Select an employee first to calculate paycheck.</h4>
      </div>
    }
    let typeDisplay = this.props.employee.hourly ? 'Hours' : 'Salary'
    return (
      <div className='paycheck-details col-md-4'>
        {this.renderInput()}
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