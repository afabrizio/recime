import React from 'react';

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
          <div className="sidebar-item" className="dashboard-border">Account</div>
          <div className="sidebar-item" className="dashboard-border">Dashboard</div>
        </div>
        <div id="dashboard-main" className="dashboard-border">
          <div id="dashboard-image" className="dashboard-border">IMAGE</div>
          <div id="dashboard-modules-container" className="dashboard-border">
            <div className="module-row">
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
            </div>
            <div className="module-row">
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
              <div className="module-spacer"></div>
              <div className="module dashboard-border"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
