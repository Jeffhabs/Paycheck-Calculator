import ActionTypes from '../constants/actionTypes'
import database from '../firebase/firebase'

export function selectEmployee(employee) {
  return {
    type: ActionTypes.GetEmployeeByIdFulfilled,
    payload: employee
  };
}