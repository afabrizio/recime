const React = require('react');
const {connect} = require('react-redux');
const signInRequest = require('./actions/sign-in-request.js');

const loginPage = ({dispatch}) => {
  return (
    <div>
      <div id="logo">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Reci_me
        </div>
      </div>
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
                onClick={() => {signInRequest(event, dispatch)} }>
                  Sign In
              </button>
          </form>
          <div id="login-links">
            <a>sign-in</a> | <a>register</a>
          </div>
        </div>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return (
    {

    }
  )
}

module.exports = connect(mapStateToProps)(loginPage);
