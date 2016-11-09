import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../../store.js';

const createPage = React.createClass({
  render() {
    var user = this.props.user;
    var dispatch = this.props.dispatch;
    var currentView = this.props.currentView;
    var currentRecipe = this.props.currentRecipe;

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
          browserHistory.push(`/${user}/dashboard`);
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
            <div id="tools">
              <span className="fa fa-caret-left"></span>
              <span
              className="fa fa-caret-right"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.next(dispatch, user, currentView, currentRecipe)}}>
              </span>
              <span
              className="fa fa-floppy-o"
              onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = 'rgb(86,165,135)'}
              onClick={(e) => {this.save(dispatch, user, currentView, currentRecipe)}}>
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

  save: function(dispatch, user, currentView, currentRecipe) {
    let timeStamp = Date.now();
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;

    switch (currentCreateState) {
      case 'overview-container':
        //collect recipe data from user:
        let recipeName = document.getElementById('the-recipe-name');
        let recipeType = document.getElementById('the-recipe-type');
        let recipeTime = document.getElementById('the-recipe-time');
        let recipeTimeUnits = document.getElementById('recipe-time-units');
        let recipeDifficulty = document.getElementById('the-recipe-difficulty');
        let recipeImage = document.getElementById('the-recipe-image');
        let recipeDescription = document.getElementById('the-recipe-description');

        switch (currentView) {
          case 'create : overview : newInstance':
            if(recipeName.value !== '') {
              //save and store content to the state:
              let newRecipeContent =
                {
                  recipeId: this.idGenerator(),
                  createdBy: this.props.user,
                  createdTimestamp: timeStamp,
                  createStage: 'overview',
                  recipeName: recipeName.value,
                  recipeType: recipeType.value,
                  recimeTime: recipeTime.value + recipeTimeUnits.value,
                  recipeDifficulty: recipeDifficulty.value,
                  recipeImage: recipeImage.value,
                  recipeDescription: recipeDescription.value
                }
              dispatch({type: 'UPDATE_CURRENT_RECIPE', payload: newRecipeContent.recipeId});
              dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create : overview : updateInstance'});
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
                      saving: 'Recipe Content : overview',
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

          case 'create : overview : updateInstance':
            if(recipeName.value !== '') {
              //retrieve recipe data from the database:
              this.getRecipeData(user, currentRecipe)
                .then( recipe => {
                  let newRecipeContent =
                    {
                      recipeId: recipe.recipeId,
                      createdBy: this.props.user,
                      createdTimestamp: recipe.createdTimestamp,
                      createStage: 'overview',
                      recipeName: recipeName.value,
                      recipeType: recipeType.value,
                      recimeTime: recipeTime.value + recipeTimeUnits.value,
                      recipeDifficulty: recipeDifficulty.value,
                      recipeImage: recipeImage.value,
                      recipeDescription: recipeDescription.value
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
                            saving: 'Recipe Content : overview',
                            recipeContent: newRecipeContent
                          }
                        )
                      }
                    let saveRecipeContent = new Request(URI, requestProps);
                    fetch(saveRecipeContent)
                      .then(response => response.json())
                      .then(response => console.log(response));
                });
            } else {
              window.alert('Recipe must have at least a name.');
              return;
            }
            break;

          default:

        }
        break;

      case 'ingredients-container':
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
                saving: 'Recipe Content : ingredients',
                currentRecipe: currentRecipe,
                recipeContent: store.getState().ingredients
              }
            )
          }
        let saveRecipeContent = new Request(URI, requestProps);
        fetch(saveRecipeContent)
          .then(response => response.json())
            .then(response => console.log(response));
        break;

      default:
        return;
    }
  },

  next: function(dispatch, user, currentView, currentRecipe) {
    let currentCreateState = document.getElementById('create-main-content').firstChild.id;
    switch (currentCreateState) {
      case 'overview-container':
        if(!document.getElementById('the-recipe-name').value){
          return;
        }
        this.save(dispatch, user, currentView, currentRecipe);
        browserHistory.push('/:user/create/ingredients');
        dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create : ingredients : newInstance'});
        break;

      case 'ingredients-container':
        this.save(dispatch, user, currentView, currentRecipe);
        browserHistory.push('/:user/create/steps');
        dispatch({type: 'UPDATE_CURRENT_VIEW', payload: 'create : steps : newInstance'})
      default:
        return;
    }
  },

  getRecipeData: function(user, recipeId) {
    return new Promise(resolve => {
      var PORT = process.env.PORT || 8080;
      let URI = `recipes`;
      let requestProps =
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(
            {
              username: user,
              recipeId: recipeId
            }
          )
        }
      let getRecipeData = new Request(URI, requestProps);
      fetch(getRecipeData)
        .then(response => response.json())
        .then(response => {resolve(response)});
    })
  }

})

const mapStateToProps = (state) => {
  return (
    {
      user: state.user,
      currentView: state.currentView,
      currentRecipe: state.currentRecipe
    }
  )
}

export default connect(mapStateToProps)(createPage);
