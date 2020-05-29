import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import configureStore from '../model/reduxStore';
import App from '../app';


export const HotApp = hot(App);

export const store = configureStore();

export const ColdApp = () => (
  <Provider store={store}>
    <Router>
      <HotApp />
    </Router>
  </Provider>
);
