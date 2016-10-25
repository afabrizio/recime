const {createStore} = require('redux');
const reducer = require('./reducers/reducer.js');

var store = createStore(reducer);

module.exports = store;
