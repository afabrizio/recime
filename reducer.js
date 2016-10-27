const initialState = {};

export default function(state=initialState, action) {
  switch (action.type) {
    case 'LOAD_LOGIN_PAGE':
      state = Object.assign({}, state, {currentView: 'login'});
      break;
    default:
      state = Object.assign({}, state);
  }
  return state;
}