import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'
import { getEmployees } from '../actions/getEmployees'
import EmployeeDetails from './employee_details'
import { selectEmployee } from '../actions/getEmployee'
import PaycheckDetails from './paycheck_details'

class PayrollPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.onGetEmployees();
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
    return (
      <div className='payroll-container'>
        <div className='row'>
          <div className='title fields col-md-3'>
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
            <ul className='list-group col-sm-3'>
              { this.renderList() }
            </ul>
          </div>
          <EmployeeDetails />
          <PaycheckDetails />
        </div>
        {/* New Employee Button */}
        <div className='row'>
          <div className="col-md-7">
            <button type="submit" className="btn btn-primary">New Employee</button>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Calculate</button>
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


