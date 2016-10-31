const initialState = {currentView: null};

export default function(state=initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      state = Object.assign({}, state, {currentView: 'dashboard', user: action.payload});
      break;
    default:
      state = Object.assign({}, state);
  }
  return state;
}
