import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	
	handleFormSubmit(formProps){
		// call action creator to sign up user
		this.props.signupUser(formProps)
	}

	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Opps!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render(){
		const {handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

		return(
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="formGroup">
					<label>Email:</label>
					<input type="text" className="form-control" {...email} />
					{email.touched && email.error && <div className="error">{email.error} </div>}
				</fieldset>

				<fieldset className="formGroup">
					<label>Password:</label>
					<input type="text" className="form-control" {...password} />
					{/* if true        &&  true         		 return last object which is div */}
					{password.touched && password.error && <div className="error">{password.error} </div>}
				</fieldset>

				<fieldset className="formGroup">
					<label>Confirm password:</label>
					<input type="text" className="form-control" {...passwordConfirm} />
					{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error} </div>}
				</fieldset>
				{ this.renderAlert() }
				<button type="submit" className="btn btn-default">Sign up!</button>
			</form>
		);
	}
}

function validate(formProps){
	const errors = {};

	if(!formProps.email){
		errors.email = 'Please enter an email';
	}

	if(!formProps.password){
		errors.password = 'Please enter a password';
	}

	if(!formProps.passwordConfirm){
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	if(formProps.password !== formProps.passwordConfirm){
		errors.password = 'Password must match';
	}

	return errors;

}

function mapStateToProps(state){
	return {
		errorMessage: state.auth.error
	}
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate: validate
}, mapStateToProps, actions)(Signup);

