import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router'
import { Provider } from 'react-redux'
import { firebase } from './firebase/firebase'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import App from './components/app'
//import rootRedcuer from './reducers/index'
import reducers from './reducers'

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('logged in');
    console.log(`USER ID: ${user.uid}`);
  } else {
    console.log('logged out');
  }
});

firebase.auth().signInAnonymously().then((user) => {
  
}).catch((error) => {
  console.log(`Error: ${error}`);
});







