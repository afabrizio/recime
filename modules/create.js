import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage = React.createClass({
  render() {
    var user = this.props.user;
    var dispatch = this.props.dispatch;
    var recipes = this.props.recipes;

    return (
      <div id="create-container">
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
              onClick={(e) => {this.next(dispatch, recipes, user)}}>
              </span>
              <span
              className="fa fa-floppy-o"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.save(dispatch, recipes, user)}}>
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

  save: function(dispatch, recipes, user) {
    let timeStamp = Date.now();
    let id = this.idGenerator();
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;
    let creatingOrUpdating = 'creating';
    if(store.getState().currentView === 'create : overview : updateInstance') {
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
          //save and store content to the state:
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
              payload: 'create : overview : updateInstance'}
            );
          }
          //Send saved content to the database:
          var PORT = process.env.PORT || 8080;
          let URI = '/users';
          let requestProps =
            {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(
                {
                  username: user,
                  saving: 'Recipe Content',
                  recipeContent: newRecipeContent
                }
              )
            }
          let saveRecipeContent = new Request(URI, requestProps);
          fetch(saveRecipeContent)
            .then(response => response.json())
            .then(response => console.log(response));
        } else {
          window.alert('Recipe must have at least a name.');
          return;
        }
        break;

      default:
        return;
    }
  },

  next: function(dispatch, recipes, user) {
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;
    switch (currentCreateState) {
      case 'overview-container':
        this.save(dispatch, recipes, user);
        browserHistory.push('/:user/create/ingredients');
        dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create : ingredients : updateInstance'})
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
