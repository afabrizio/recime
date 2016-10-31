import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import store from './../store.js';

const dashboard =  React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    return (
      <div id="dashboard-container">
        <div id="dashboard-sidebar" className="dashboard-border">
          <div id="dashboard-logo" className="dashboard-border">
            Reci-me
          </div>
          <div className="sidebar-item dashboard-border">Account</div>
          <div className="sidebar-item dashboard-border">Dashboard</div>
        </div>
        <div id="dashboard-main" className="dashboard-border">
          <div id="dashboard-image" className="dashboard-border">
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
    store.dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create-recipe'});
    browserHistory.push(`/${store.getState().user}/create`);
    console.log(store.getState());
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
