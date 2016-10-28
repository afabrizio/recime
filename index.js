import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';

import App from './modules/App';
import Login from './modules/Login.js';
import Register from './modules/Register.js';
import Home from './modules/Home.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Route>
      </Router>
    </Provider>
  ),
   document.getElementById('app-container')
 );
