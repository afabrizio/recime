import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage = React.createClass({
  render() {
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
              <span
              className="fa fa-floppy-o"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.save()}}>
              </span>
            </div>
          </div>
          <div id="create-main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  },

  save: function() {
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;

    switch (currentCreateState) {
      case 'overview-container':
        let recipeName = document.getElementById('the-recipe-name');
        let recipeType = document.getElementById('the-recipe-type');
        let recipeTime = document.getElementById('the-recipe-time');
        let recipeDifficulty = document.getElementById('the-recipe-difficulty');
        let recipeImage = document.getElementById('the-recipe-image');
        let recipeDescription = document.getElementById('the-recipe-description');

        if(recipeName.value === '') {
          return;
        } else {
          this.props.recipes.push(
            {
              createdBy: this.props.user,
              createdTimestamp: Date.now(),
              createStage: 'overview',
              recipeName: recipeName.value,
              recipeType: recipeType.value,
              recimeTime: recipeTime.value,
              recipeDifficulty: recipeDifficulty.value,
              recipeImage: recipeImage.value,
              recipeDescription: recipeDescription.value
            }
          );
          console.log(store.getState())
        }
        break;

      default:
    }
  }
})

const mapStateToProps = (state) => {
  return (
    {
      user: state.user,
      recipes: state.recipes
    }
  )
}

export default connect(mapStateToProps)(createPage);
