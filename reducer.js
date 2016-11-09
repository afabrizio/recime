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
      let updatedSteps = state.steps.concat();
      console.log(updatedSteps)
      if(updatedSteps[0] === {}) {
        console.log('setting first case') //somehow has property with image: null??
        updatedSteps[0] = {step: 1};
        updatedSteps[0].image = action.payload.image;
        updatedSteps[0].todos = [];
        updatedSteps[0].todos.push(action.payload.todo);
      } else {
        if(!updatedSteps[action.payload.step-1]) {
          updatedSteps.push({step: acion.payload.step})
        }
        updatedSteps[action.payload.step-1].image = action.payload.image;
        updatedSteps[action.payload.step-1].todos.push(action.payload.todo);
      }
      state = Object.assign({}, state, {steps: updatedSteps});
      break;

    case 'DELETE_TODO':
      let modifiedSteps = state.steps.concat();
      modifiedSteps[action.payload.step-1].todos.splice(action.payload.todoIndex, 1);
      state = Object.assign({}, state, {steps: modifiedSteps});
      break;

    default:
      state = Object.assign({}, state);
  }
  return state;
}
