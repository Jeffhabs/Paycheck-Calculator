import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'
import { getEmployees } from '../actions/getEmployees'
import EmployeeDetails from './employee_details'
import { selectEmployee } from '../actions/getEmployee'
import PaycheckDetails from './paycheck_details'
import { Redirect } from 'react-router-dom'

class PayrollPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }

  }

  componentDidMount() {
    this.props.onGetEmployees();
  }

  onNewEmployeeClicked = () => {
    this.setState({redirect: true})
  }

  renderList() {
    const employees = this.props.employees
    return this.props.employees.map((employee) => {
      return (
        <li key={employee.key} onClick={() => this.props.selectEmployee(employee)} className='list-group-item'>
          <h4>{`${employee.first_name} ${employee.last_name}`}</h4>
        </li>
      );
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect path to='/'/>
    }
    return (
      <div className='payroll-container'>
        <div className='row'>
          <div className='title col-md-4'>
            <h3>Employees</h3>
          </div>
          <div className='title col-md-4'>
            <h3>Details</h3>
          </div>
          <div className='title col-md-4'>
            <h3>Paycheck</h3>
          </div>
        </div>
        <div className='payroll row'>
          <div>
            <ul className='list-group col-md-4'>
              { this.renderList() }
            </ul>
          </div>
          <div className='employee-container'>
            <EmployeeDetails />
          </div>
          <PaycheckDetails />
        </div>
        {/* New Employee Button */}
        <div className='row'>
          <div className="col-md-9">
            <button onClick={this.onNewEmployeeClicked} type="submit" className="btn btn-primary">New Employee</button>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ onGetEmployees: getEmployees, selectEmployee: selectEmployee}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollPage);


