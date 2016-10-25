const ReactDOM = require('react-dom');
const React = require('react');
const {Provider} = require('react-redux');
const store = require('./store.js');
const LoginPage = require('./login-page.js');

ReactDOM.render(
  <Provider store={store}>
    <LoginPage />
  </Provider>,
  document.getElementById('login-container')
);
