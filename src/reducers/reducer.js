const {combineReducers} = require('redux');
const login = require('./login.js');

const reducer = combineReducers(
  {
    login: login
  }
);

module.exports = reducer;
