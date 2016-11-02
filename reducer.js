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
    default:
      state = Object.assign({}, state);
  }
  return state;
}
