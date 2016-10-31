import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage = React.createClass({
  render() {
    console.log(this.props)
    return (
      <div id="create-container">
        <div id="create-sidebar">
          <div id="create-logo" className="dashboard-border">
            Reci-me
          </div>
          <div className="sidebar-item dashboard-border">Account</div>
          <div className="sidebar-item dashboard-border">Dashboard</div>
        </div>
        <div id="create-main">
          <div id="create-main-header">
          </div>
          <div id="create-main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return (
    {
      user: state.user
    }
  )
}

export default connect(mapStateToProps)(createPage);
