import React from 'react';
import store from './../store.js';

export default React.createClass({
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
              onClick={() => }>
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
  }
})
