import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const registerPage = React.createClass({
  render() {
    return (
      <div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" id="login">
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
              <label className="control-label" htmlFor="username">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password" />
            </div>
              <button
                type="button"
                onClick={() => {} }>
                  Register
              </button>
          </form>
          <div id="register-links">
            <Link to='/login' activeStyle={{ color: 'violet' }}>
              login
            </Link> |
            <Link to='/register' activeStyle={{ color: 'violet' }}>
              register
            </Link>
          </div>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
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
