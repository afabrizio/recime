const initialState = {currentView: null};

export default function(state=initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      state = Object.assign({}, state, {user: action.payload});
      break;

    case 'UPDATE_CURRENT_VIEW':
      state= Object.assign({}, state, {currentView: action.payload});
      break;

    default:
      state = Object.assign({}, state);
  }
  return state;
}
