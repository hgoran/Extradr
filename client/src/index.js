import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Feature from './components/feature';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if we have a token, consider user to be signed in
if(token){
  // we need update application state
  store.dispatch({ type: AUTH_USER });
  // property of store is dispatch we are using in redux-thunk
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
			<Route path="signin" component={Signin}/>
			<Route path="signout" component={Signout}/>
			<Route path="signup" component={Signup}/>
      <Route path="feature" component={RequireAuth(Feature)}/>
    	</Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));