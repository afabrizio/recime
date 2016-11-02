import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage = React.createClass({
  render() {
    var dispatch = this.props.dispatch;
    var recipes = this.props.recipes;
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
              <span
              className="fa fa-caret-right"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.next(dispatch, recipes)}}>
              </span>
              <span
              className="fa fa-floppy-o"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.save(dispatch, recipes)}}>
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

  idGenerator: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  save: function(dispatch, recipes) {
    let timeStamp = Date.now();
    let id = this.idGenerator();
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;
    let creatingOrUpdating = 'creating';
    if(store.getState().currentView === 'create-updateInstance') {
      creatingOrUpdating = 'updating';
      timeStamp = recipes[recipes.length-1].createdTimestamp;
      id = recipes[recipes.length-1].recipeId;
    }

    switch (currentCreateState) {
      case 'overview-container':
        let recipeName = document.getElementById('the-recipe-name');
        let recipeType = document.getElementById('the-recipe-type');
        let recipeTime = document.getElementById('the-recipe-time');
        let recipeDifficulty = document.getElementById('the-recipe-difficulty');
        let recipeImage = document.getElementById('the-recipe-image');
        let recipeDescription = document.getElementById('the-recipe-description');

        if(recipeName.value !== '') {
          let newRecipeContent =
            {
              recipeId: id,
              createdBy: this.props.user,
              createdTimestamp: timeStamp,
              createStage: 'overview',
              recipeName: recipeName.value,
              recipeType: recipeType.value,
              recimeTime: recipeTime.value,
              recipeDifficulty: recipeDifficulty.value,
              recipeImage: recipeImage.value,
              recipeDescription: recipeDescription.value
            }
          dispatch(
            {
              type: 'SAVE_RECIPE_CONTENT',
              payload: {
                newRecipeContent: newRecipeContent,
                saveType: creatingOrUpdating
              }
            }
          );
          if(creatingOrUpdating === 'creating') {
            dispatch(
              {type: 'UPDATE_CURRENT_VIEW',
              payload: 'create-updateInstance'}
            );
          }
        } else {
          window.alert('Recipe must have at least a name.');
          return;
        }
        break;

      default:
        return;
    }
  },

  next: function(dispatch, recipes) {
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;
    switch (currentCreateState) {
      case 'overview-container':
        this.save(dispatch, recipes);
        browserHistory.push('/:user/create/overview');
        break;

      default:
        return;
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
