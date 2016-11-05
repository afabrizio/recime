import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../store.js';

const createPage_needed = React.createClass({
  render() {
    var dispatch = this.props.dispatch;
    var recipes = this.props.recipes;

    return (
      <div id="ingredients-container">
        <div>
          <div id="ingredients">
            <div><u>Ingredients</u></div>
            <div id="added-ingredients"></div>
            <div>
              <input id="qty" type="number" min="0" max="99" placeholder="qty"/>
              <select id="qty-unit">
                <option></option>
                <option>teaspoon</option>
                <option>tablespoon</option>
                <option>cup</option>
                <option>quart</option>
                <option>gallon</option>
                <option>other</option>
              </select>
              <input id="new-ingredient" className="ingredient-description" type="text" placeholder="ingredient" maxLength="32"/>
              <button
              onClick={() => this.addIngredient(dispatch, recipes)}
              className="add-item-btn"
              type="button">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },

  addIngredient: function(dispatch, recipes) {
    let theQty = document.getElementById('qty');
    let theQtyUnit = document.getElementById('qty-unit');
    let newIngredient = document.getElementById('new-ingredient');
    let theAddedIngredients = document.getElementById('added-ingredients');
    let ingredientContainer = document.createElement('div');
    let theNewIngredient = document.createElement('span');
    let deleteOption = document.createElement('span');

    if(theQty.value === '' || theQtyUnit === '' || newIngredient.value === '') {
      window.alert('Please fill out all fields to add the ingredient.');
      return;
    }
    deleteOption.className = 'fa fa-times delete';
    deleteOption.addEventListener('mouseover', (e) => {
      e.target.style.color = 'red';
    })
    deleteOption.addEventListener('mouseout', (e) => {
      e.target.style.color = 'white';
    })
    deleteOption.addEventListener('click', (e) => {
      //delete the ingredient from the state object:
      let updateId = recipes.concat()[recipes.length-1].recipeId;
      let deleteIngredientAt = null;
      let updatedIngredients = [];
      Array.from(theAddedIngredients.children).forEach( (ingredientDiv, index) => {
        if(ingredientDiv.firstChild === e.target) {
          deleteIngredientAt = index;
        }
      });
      let updatedRecipes = recipes.concat().forEach(recipe => {
        if(recipe.recipeId === updateId) {
          recipe.ingredients.splice(deleteIngredientAt, 1);
          updatedIngredients = recipe.ingredients;
        }
      });
      dispatch(
        {
          type:'DELETE_INGREDIENT',
          payload:
            {
              recipeId: updateId,
              updatedIngredients: updatedIngredients
            }
        }
      );
      //remove the ingredient from the view:
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    })
    theNewIngredient.className = 'ingredient';
    theNewIngredient.textContent = '[ ' + theQty.value + ' ' + theQtyUnit.value + ' ]  ' + newIngredient.value;
    ingredientContainer.appendChild(deleteOption);
    ingredientContainer.appendChild(theNewIngredient);
    theAddedIngredients.appendChild(ingredientContainer);

    dispatch(
      {
        type: 'ADD_NEW_INGREDIENT',
        payload:
          {
            updateRecipe: recipes[recipes.length-1].recipeId,
            newIngredient: newIngredient.value,
            qtyUnit: theQtyUnit.value,
            qty: theQty.value
          }
      }
    );
    theQty.value = '';
    theQtyUnit.value = '';
    newIngredient.value = '';
    return;
  }
});

const mapStateToProps = (state) => {
  return (
    {
      user: state.user,
      recipes: state.recipes
    }
  )
}

export default connect(mapStateToProps)(createPage_needed);
