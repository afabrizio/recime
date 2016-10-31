import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const loginPage = React.createClass({
  render() {
    return (
      <div id="login-container" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div id="login-logo">
          Reci-me
        </div>
        <div id="login">
          <form id="login-form">
            <div className="form-group has-feedback">
              <label className="control-label" htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="username" />
            </div>
            <div className="form-group has-feedback">
              <label className="control-label" htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password" />
            </div>
              <button
                type="button"
                onClick={() => {handleLogin()} }>
                  Login
              </button>
          </form>
          <div id="login-links">
            <Link to='/login' activeStyle={{ color: 'rgb(36,36,36)' }}>
              login
            </Link>
            <span> | </span>
            <Link to='/register' activeStyle={{ color: 'rgb(36,36,36)' }}>
              register
            </Link>
          </div>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return (
    {

    }
  )
}

export default connect(mapStateToProps)(loginPage);

function handleLogin() {
  const theUsername = document.getElementById('username').value;
  const thePassword = document.getElementById('password').value;
  var PORT = process.env.PORT || 8080;
  let URI = `http://localhost:${PORT}/users`;
  let requestProps =
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( {username: `${theUsername}`, password: `${thePassword}`} )
    }
  let validateUser = new Request(URI, requestProps);
  fetch(validateUser)
    .then( response => response.json() )
    .then( user => {
      const response = JSON.parse(JSON.stringify(user));
      if(typeof response === 'object') {
        store.dispatch({type: 'LOGIN_USER', payload: response.username});
        store.dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'dashboard'});
        console.log(store.getState())
        browserHistory.push(`/${response.username}/dashboard`);
      } else {
        return;
      }
    })
}
