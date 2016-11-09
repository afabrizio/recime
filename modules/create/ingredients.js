import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import store from './../../store.js';

const createPage_needed = React.createClass({
  render() {
    var dispatch = this.props.dispatch;
    var currentRecipe = this.props.currentRecipe;
    var ingredients = this.props.ingredients;

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
              onClick={() => this.addIngredient(dispatch, currentRecipe)}
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

  addIngredient: function(dispatch, currentRecipe) {
    // get user inputs:
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
      var updatedIngredients = store.getState().ingredients.concat();
      Array.from(theAddedIngredients.children).forEach( (ingredientDiv, index) => {
        if(ingredientDiv.firstChild === e.target) {
          updatedIngredients.splice(index, 1);
        }
      });
      dispatch({type:'DELETE_INGREDIENT', payload: updatedIngredients});
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
            currentRecipe: currentRecipe,
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
      currentRecipe: state.currentRecipe,
      ingredients: state.ingredients
    }
  )
}

export default connect(mapStateToProps)(createPage_needed);
