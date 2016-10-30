import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const registerPage = React.createClass({
  render() {
    return (
      <div id="register-container" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div id="register-logo">
          Reci-me
        </div>
        <div id="register">
          <form id="register-form">
            <div className="form-group has-feedback">
              <label className="control-label" htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="username"/>
            </div>
            <div className="form-group has-feedback">
              <label className="control-label" htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"/>
            </div>
            <div className="form-group has-feedback">
              <label className="control-label" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="password"/>
            </div>
              <button
                type="button"
                onClick={() => {handleRegister()} }>
                  Register
              </button>
          </form>
          <div id="register-links">
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
});

const mapStateToProps = (state) => {
  return (
    {

    }
  )
}

export default connect(mapStateToProps)(registerPage);

function handleRegister() {
  const theUsername = document.getElementById('username').value;
  const thePassword = document.getElementById('password').value;
  const theConfirmPassword = document.getElementById('confirm-password').value;

  if(thePassword !== theConfirmPassword) {
    console.log('Passwords do not match.');
    return;
  }

  var PORT = process.env.PORT || 8080;
  let URI = `http://localhost:${PORT}/users`;
  let requestProps =
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( {username: `${theUsername}`, password: `${thePassword}`} )
    }
  let addUser = new Request(URI, requestProps);
  fetch(addUser)
    .then( response => response.json() )
    .then( user => {
      console.log('Added new user ' + user.username + '!');
    })
}
