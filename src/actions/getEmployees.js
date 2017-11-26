import ActionTypes from '../constants/actionTypes'
import database from '../firebase/firebase'

export function getEmployees() {
  return dispatch => {
    return database.ref('/employees').once('value', snap => {
      const employees = snap.val();
      dispatch(getEmployeesFullfilledAction(employees))
    }).catch((error) => {
      console.log('Error in getEmployees(): ', error)
    })
  }
}

function getEmployeesFullfilledAction(employees) {
  return {
    type: ActionTypes.GetEmployeesFulfilled,
    payload: employees
  };
}