const initialState =
  {
    currentView: null,
    user: null,
    recipes: []
  };

export default function(state=initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      state = Object.assign({}, state, {user: action.payload});
      break;

    case 'UPDATE_CURRENT_VIEW':
      state = Object.assign({}, state, {currentView: action.payload});
      break;

    case 'SAVE_RECIPE_CONTENT':
      let theUserRecipes = state.recipes.concat();
      let creatingOrUpdating = action.payload.saveType;
      let newRecipeContent = action.payload.newRecipeContent;
      switch (creatingOrUpdating) {
        case 'creating':
          theUserRecipes.push(newRecipeContent);
          break;
        case 'updating':
          theUserRecipes.splice(theUserRecipes.length-1, 1, newRecipeContent);
          break;
        default:
      }
      state = Object.assign({}, state, {recipes: theUserRecipes});
      break;

    case 'ADD_NEW_INGREDIENT':
      let recipesCopy1 = state.recipes.concat();
      recipesCopy1.forEach( (recipe) => {
        if(recipe.recipeId === action.payload.updateRecipe) {
          if(recipe.ingredients) {
            recipe.ingredients.push(action.payload);
          } else {
            recipe.ingredients = [];
            recipe.ingredients.push(action.payload);
          }
        }
      })
      state = Object.assign({}, state, {recipes: recipesCopy1});
      break;

    case 'DELETE_INGREDIENT':
      let recipesCopy2 = state.recipes.concat();
      recipesCopy2.forEach( (recipe) => {
        if(action.payload.recipeId === recipe.id) {
          recipe.ingredients = action.payload.updatedIngredients;
        }
      });
      state = Object.assign({}, state, {recipes: recipesCopy2});
      break;

    default:
      state = Object.assign({}, state);
  }
  return state;
}
