import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'

class PaycheckDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      salary: 0,
      pay: 0,
      gross: 0,
      fica: 0,
      federal: 0,
      state: 0,
      net: 0
    }
  }

  onHoursChanged = (event) => {
    this.setState({ hours: event.target.value })
  }

  onSalaryChanged = (event) => {
    this.setState({ salary: event.target.value })
  }

  onPayChanged = (event) => {
    this.setState({ pay: event.target.value })
  }

  renderInput = () => {
    if (!this.props.employee.hourly) {
      return (
        <div className='row'>
          <div className='hours col-md-12'>
            <div className='input-group'>
              <span className='input-group-addon' id='basic-addon3'>Salary</span>
              <input onChange={this.onSalaryChanged} type='number' className='form-control' placeholder='Enter salary' aria-describedby='basic-addon3'></input>
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
            <input onChange={this.onHoursChanged} type='number' className='form-control'  aria-describedby='basic-addon3'></input>
          </div>
        </div>
        <div className='hours col-md-6'>
          <div className='input-group'>
            <span className='input-group-addon'>$</span>
            <input onChange={this.onPayChanged} type='number' className='form-control' aria-label='Amount (to the nearest dollar)'></input>
            <span className='input-group-addon'>.00</span>
          </div>
        </div>
      </div>
    );
  }

  round = (number, precision) => {
      let factor = Math.pow(10, precision);
      let tempNumber = number * factor;
      let roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
  }

  onCalculatePaycheck = () => {
    let grossPay = this.state.hours * this.state.pay
    let ficaPay = grossPay * (this.props.employee.fica * .01)
    Math.round(ficaPay)
    let federalPay = grossPay * (this.props.employee.federal * .01)
    let statePay = grossPay * (this.props.employee.state * .01)

    let grossPayRounded = this.round(grossPay, 2)
    let ficaRounded = this.round(ficaPay, 2)
    let federalRounded = this.round(federalPay, 2)
    let stateRounded = this.round(statePay, 2)

    let deductions = ficaRounded + federalRounded + stateRounded

    let netPay = grossPayRounded - deductions
    let netPayRounded = this.round(netPay, 2)

    this.setState({
      gross: grossPayRounded,
      fica: ficaRounded,
      federal: federalRounded,
      state: stateRounded,
      net: netPayRounded
    })
  }

  renderGrossPay = () => {
    if (this.state.gross !== 0) {
      return (
        <div className='row'>
          <div className='col-md-9 fields'>
            Gross
          </div>
          <div className='numbers col-md-3'>
            {this.state.gross}
          </div>
        </div>
      )
    }
  }

  renderFica = () => {
    if (this.state.fica !== 0) {
      return (
        <div className='row'>
          <div className='col-md-9'>
            Fica
          </div>
          <div className='numbers col-md-3'>
            -{this.state.fica}
          </div>
        </div>
      )
    }
  }

  renderFederal = () => {
    if (this.state.federal !== 0) {
      return (
        <div className='row'>
          <div className='col-md-9'>
            Federal
          </div>
          <div className='numbers col-md-3'>
            -{this.state.federal}
          </div>
        </div>
      )
    }
  }

  renderState = () => {
    if (this.state.state !== 0) {
      return (
        <div className='row'>
          <div className='col-md-9'>
            State
          </div>
          <div className='numbers col-md-3'>
            -{this.state.state}
          </div>
        </div>
      )
    }
  }

  renderNet = () => {
    if (this.state.net !== 0) {
      return (
        <div className='row'>
          <div className='col-md-9'>
            <h4>Net Pay</h4>
          </div>
          <div className='numbers col-md-3'>
            <h4>${this.state.net}</h4>
          </div>
        </div>
      )
    }
  }

  renderButton = () => {
    if(this.state.hours > 0 && this.state.pay > 0) {
      return (
        <div className="toggleBtn col-md-9">
          <button onClick={this.onCalculatePaycheck} type="submit" className="title pay btn btn-secondary">Calculate Paycheck</button>
        </div>
      );
    }
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
        {this.renderButton()}
        {this.renderGrossPay()}
        {this.renderFica()}
        {this.renderFederal()}
        {this.renderState()}
        {this.renderNet()}
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