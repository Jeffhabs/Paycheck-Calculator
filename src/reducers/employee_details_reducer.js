import ActionTypes from '../constants/actionTypes'

export default function(state = null, action) {
  switch(action.type) {
  case ActionTypes.GetEmployeeByIdFulfilled:
    return action.payload;
  default:
    return state;
  }
}