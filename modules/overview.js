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
          id="the-recipe-name"
          type="text"
          maxLength="36"
          placeholder="enter the recipe name" />
        </div>
        <div id="recipe-categories">
          <div id="recipe-type">
            <div className="fa fa-cutlery overview-icon"></div>
            <div>Type</div>
            <select id="the-recipe-type">
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </select>
          </div>
          <div id="recipe-time">
            <div className="fa fa-clock-o overview-icon"></div>
            <div>Ready In</div>
            <input id="the-recipe-time" type="number" min="0" max="999"/>
            <select id="recipe-time-units">
              <option>Minutes</option>
              <option>Hours</option>
              <option>Days</option>
            </select>
          </div>
          <div id="recipe-difficulty">
            <div className="fa fa-area-chart overview-icon"></div>
            <div>Difficulty</div>
            <select id="the-recipe-difficulty">
              <option>Easy</option>
              <option>Intermediate</option>
              <option>Difficult</option>
            </select>
          </div>
        </div>
        <div id="recipe-image">
          {'Recipe Image: '}
          <div></div>
          <input id="the-recipe-image" type="file"/>
        </div>
        <div id="recipe-description">
          {'Description: '}
          <textarea id="the-recipe-description" className="form-control" rows="4" maxLength="512"></textarea>
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
