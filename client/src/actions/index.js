import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
	AUTH_USER, 
	AUTH_ERROR,
	UNAUTH_USER,
	FETCH_MESSAGE 
} from './types';

const ROOT_URL = 'http://localhost:3090';

// redux-thunk returns a function
export function signinUser({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, { email, password })  // {email:email, password:password}
		// success
		.then(response => {
			// update state
			dispatch({ type: AUTH_USER });
			// save jwt token
			localStorage.setItem('token', response.data.token);
			// redirect user
			browserHistory.push('/feature');
		})
		// fail
		.catch(() => {
			
			dispatch(authError('Bad Login Info'));
		})
	}
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser(){

	localStorage.removeItem('token');
	
	return { type: UNAUTH_USER };
}
// similar to signinUser
export function signupUser({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, { email, password }) 
		.then(response => {
			dispatch({ type: AUTH_USER });
			localStorage.setItem('token', response.data.token);
			browserHistory.push('/feature');
		})
		// because of changed axios this no longer works
		// .catch(response => dispatch(authError(response.data.error)));
		
		// show error from response
		.catch(({response}) => dispatch(authError(response.data.error)));
	}
}
// reach out protected root route on server
export function fetchMessage(){
	return function(dispatch){
		axios.get(ROOT_URL,{
			headers: { authorization: localStorage.getItem('token') }
		})
		.then(response =>{
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			})
		})
	}
}
