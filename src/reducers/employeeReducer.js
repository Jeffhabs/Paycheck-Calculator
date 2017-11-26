import ActionTypes from '../constants/actionTypes'

export function employeeReducer(state = [], action) {
  switch(action.type) {
    case ActionTypes.GetEmployeesFulfilled: {
      const employees = action.payload
      let employeeList = []
      if (employees) {
        employeeList = Object.keys(employees).map(k => {
          let ar = employees[k]
          ar.key = k
          return ar
        });
      }
      return employeeList;
    }
    default:
      return state;
  }
}

