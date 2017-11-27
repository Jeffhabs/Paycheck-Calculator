import { combineReducers } from 'redux'
import { employeeReducer } from './employeeReducer'
import  getEmployee  from './employee_details_reducer'

const rootReducer = combineReducers({
  employees: employeeReducer,
  employee: getEmployee
});

export default rootReducer;
