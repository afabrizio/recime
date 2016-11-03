import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import store from './../store.js';

const dashboard =  React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    var dispatch = this.props.dispatch;
    return (
      <div id="dashboard-container">
        <div id="sidebar">
          <div className="sidebar-logo sidebar-border">
            Reci-me
          </div>
          <div
          className="sidebar-item"
          onMouseEnter={(e) => {e.target.style.backgroundColor='rgb(36,36,36)'}}
          onMouseLeave={(e) => {e.target.style.backgroundColor='black'}}>
            Account
          </div>
          <div
          className="sidebar-item"
          onMouseEnter={(e) => {e.target.style.backgroundColor='rgb(36,36,36)'}}
          onMouseLeave={(e) => {e.target.style.backgroundColor='black'}}
          onClick={() => {
            browserHistory.push(`/${store.getState().user}/dashboard`);
            dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'dashboard'});
          }}>
            Dashboard
          </div>
        </div>
        <div id="dashboard-main">
          <div id="dashboard-image">
            <div id="dashboard-greeting">
              {`Welcome, ${store.getState().user}!`}
            </div>
          </div>
          <div id="dashboard-modules-container" className="dashboard-border">
          <div id="dashboard-modules-overlay">
            <div className="module-row">
              <div
              id="dashboard-create"
              className="module dashboard-border"
              onClick={ () => {this.toCreateModule()} }>
                <div className="fa fa-pencil-square-o"></div>
                <div className="module-name">
                  Create Recipe
                </div>
              </div>
              <div className="module dashboard-border"></div>
              <div className="module dashboard-border"></div>
              <div className="module dashboard-border"></div>
              <div className="module dashboard-border"></div>
              <div className="module dashboard-border"></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  },

  toCreateModule: function() {
    store.dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create-newInstance'});
    browserHistory.push(`/${store.getState().user}/create`);
  }
})

const mapStateToProps = (state) => {
  return (
    {
      user: state.user
    }
  )
}

export default connect(mapStateToProps)(dashboard);
