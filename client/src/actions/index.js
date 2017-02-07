import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

// redux-thunk returns a function
export function signinUser({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, { email, password })  // {email:email, password:password}
		// success
		.then(response => {
			// update state
			dispatch({ type: AUTH_USER })
			// save jwt token
			// redirect user
			browserHistory.push('/feature');
		})
		// fail
		.catch(() => {

		})
	}
}

