import React from 'react';
import { LandingPage } from './components/LandingPage';
import ReduxPromise from 'redux-promise';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import { firebase } from './firebase/firebase';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

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







