import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage_overview = React.createClass({
  render() {
    return (
      <div id="overview-container">
        <div id="recipe-name">
          {'Recipe Name: '}
          <input
          type="text"
          maxLength="36"
          placeholer="type a brief name" />
        </div>
        <div id="recipe-image">
          <input type="file"/>
        </div>
        <div id="recipe-descripton">
          <textarea className="form-control" rows="3"></textarea>
        </div>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return (
    {
      user: state.user
    }
  )
}

export default connect(mapStateToProps)(createPage_overview);
