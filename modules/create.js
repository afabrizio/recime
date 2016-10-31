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
          <div className="logo dashboard-border">
            Reci-me
          </div>
          <div className="sidebar-item">Account</div>
          <div className="sidebar-item">Dashboard</div>
        </div>
        <div id="create-main">
          <div id="create-main-header">
            <div className="greeting">
              Create New Recipe
            </div>
            <div className="tools">
              <span className="fa fa-caret-left"></span>
              <span className="fa fa-caret-right"></span>
              <span className="fa fa-pencil"></span>
              <span className="fa fa-floppy-o"></span>
            </div>
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
