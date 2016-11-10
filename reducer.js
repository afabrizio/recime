const store = require('./store.js');
const initialState =
  {
    currentView: null,
    user: null,
    currentRecipe: null
  };

export default function(state=initialState, action) {
  let updatedSteps = [];
  switch (action.type) {
    case 'LOGIN_USER':
      state = Object.assign({}, state, {user: action.payload});
      break;

    case 'UPDATE_CURRENT_VIEW':
      switch (action.payload) {
        case 'dashboard':
          state = Object.assign({}, {user: state.user, currentView: action.payload});
          break;

        case 'create : ingredients : newInstance':
          state = Object.assign({}, {user: state.user, currentView: action.payload, currentRecipe: state.currentRecipe, ingredients: []});
          break;

        case 'create : steps':
          state = Object.assign({}, {user: state.user, currentView: action.payload, currentRecipe: state.currentRecipe, steps: [{}] });
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

    case 'ADD_TODO':
      updatedSteps = state.steps.concat();
      if(!updatedSteps[action.payload.step-1].todos) {
        updatedSteps[action.payload.step-1].todos = [];
      }
      updatedSteps[action.payload.step-1].todos.push(action.payload.todo);
      updatedSteps[action.payload.step-1].image = action.payload.image;
      state = Object.assign({}, state, {steps: updatedSteps});
      break;

    case 'DELETE_TODO':
      updatedSteps = state.steps.concat();
      updatedSteps[action.payload.step-1].todos.splice(action.payload.todoIndex, 1);
      state = Object.assign({}, state, {steps: updatedSteps});
      break;

    case 'ADD_STEP':
      updatedSteps = state.steps.concat();
      updatedSteps.push({});
      state = Object.assign({}, state, {steps: updatedSteps});
      break;

    default:
      state = Object.assign({}, state);
  }
  return state;
}
