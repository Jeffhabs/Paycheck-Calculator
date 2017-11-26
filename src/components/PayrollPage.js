import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { firebase } from '../firebase/firebase'
import { getEmployees } from '../actions/getEmployees'

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
        <li key={employee.key} className='list-group-item'>
          {`${employee.first_name} ${employee.last_name}`} 
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>This is my Payroll page</h1>
        <ul className='list-group col-sm-4'>
          { this.renderList() }
        </ul>
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
  return bindActionCreators({ onGetEmployees: getEmployees}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollPage);


