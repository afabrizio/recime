import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store.js';

import App from './modules/App';
import Login from './modules/login.js';
import Register from './modules/register.js';
import Home from './modules/home.js';
import Dashboard from './modules/dashboard.js';
import Create from './modules/create.js';
import Overview from './modules/overview.js';
import Ingredients from './modules/ingredients.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/:user/dashboard' component={Dashboard}/>
          <Route path='/:user/create' component={Create}>
            <IndexRoute component={Overview}/>
            <Route path='/:user/create/ingredients' component={Ingredients}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
   document.getElementById('app-container')
 );

 store.subscribe(()=>console.log(store.getState()));
