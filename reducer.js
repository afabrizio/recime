const initialState =
  {
    currentView: null,
    user: null,
    currentRecipe: null
  };

export default function(state=initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      state = Object.assign({}, state, {user: action.payload});
      break;

    case 'UPDATE_CURRENT_VIEW':
      switch (action.payload) {
        case 'create : ingredients : newInstance':
          state = Object.assign({}, {user: state.user, currentView: action.payload, currentRecipe: state.currentRecipe, ingredients: []});
          break;

        case 'create : steps : newInstance':
          state = Object.assign({}, {user: state.user, currentView: action.payload, currentRecipe: state.currentRecipe, steps: []});
          break;

        default:
          state = Object.assign({}, state, {currentView: action.payload});
      }
      break;

    case 'UPDATE_CURRENT_RECIPE':
      state = Object.assign({}, state, {currentRecipe: action.payload});
      break;

    case 'ADD_NEW_INGREDIENT':
      let updatedIngredients = state.ingredients.concat();
      updatedIngredients.push(action.payload);
      state = Object.assign({}, state, {ingredients: updatedIngredients});
      break;

    case 'DELETE_INGREDIENT':
      state = Object.assign({}, state, {ingredients: action.payload});
      break;

    default:
      state = Object.assign({}, state);
  }
  return state;
}
