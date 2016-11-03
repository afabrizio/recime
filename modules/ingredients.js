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
            <div id="added-ingredients"></div>
            <span><u>Ingredients</u></span>
            <div>
              <input id="qty" type="number" min="0" max="99"/>
              <select id="qty-unit">
                <option></option>
                <option>teaspoon</option>
                <option>tablespoon</option>
                <option>cup</option>
                <option>quart</option>
                <option>gallon</option>
                <option>other</option>
              </select>
              <input id="ingredient" className="ingredient-description" type="text" maxLength="32"/>
              <button
              onClick={() => this.addIngredient(dispatch, recipes)}
              className="add-item-btn"
              type="button">
                Add
              </button>
            </div>
          </div>
          <div id="recommended-items">
            <span><u>Recommended</u></span>
            <div>
              <input className="ingredient-description" type="text" maxLength="32"/>
              <button type="button" className="add-item-btn">Add</button>
            </div>
          </div>
        </div>
      </div>
    )
  },

  addIngredient: function(dispatch, recipes) {
    let theQty = document.getElementById('qty');
    let theQtyUnit = document.getElementById('qty-unit');
    let newIngredient = document.getElementById('ingredient');
    let theAddedIngredients = document.getElementById('added-ingredients');
    let theNewIngredient = document.createElement('p');
    let deleteOption = document.createElement('span');

    if(theQty.value === '' || theQtyUnit === '' || newIngredient.value === '') {
      window.alert('Please fill out all fields to add the ingredient.');
      return;
    }
    deleteOption.className = 'fa fa-times';
    theAddedIngredients.appendChild(deleteOption);
    theNewIngredient.textContent = '[' + theQty.value + ' ' + theQtyUnit.value + '] ' + newIngredient.value;
    theAddedIngredients.appendChild(theNewIngredient);
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
