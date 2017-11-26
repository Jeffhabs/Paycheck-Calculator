/*
 * A container wraps a component by injecting state
 * and dispatch via props.
 * 
 * A container is a perfect spot for performing 
 * http requests and async actions. Keeping the component 
 * clean from such things.
 * 
 */ 

import { connect } from 'react-redux'

// import actions
import { getEmployees } from '../actions/getEmployees'

// import components
import PayrollPage from '../components/PayrollPage'
import { bindActionCreators } from 'redux'


function mapStateToProps(state) {
  return {
    employee: state.employees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ onGetEmployees: getEmployees}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PayrollPage);

