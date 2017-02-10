import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{
	
	handleSubmitForm({email, password}){
		console.log(email, password);
		// need to do sth when user login
		this.props.signinUser({email, password});
	}
	renderAlert(){
		if (this.props.errorMessage) {
			return(
				<div className="alert alert-danger">
					<strong>Opps!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}
	render(){
		const {handleSubmit, fields: { email, password}} = this.props;
		return(
			<form onSubmit={ handleSubmit(this.handleSubmitForm.bind(this)) }>
				<fieldset className="formGroup">
					<label>Email:</label>
					<input type="text" className="form-control" {...email}/>
				</fieldset>
				<fieldset className="formGroup">
					<label>Password:</label>
					<input type="text" className="form-control" {...password}/>
				</fieldset>
				{ this.renderAlert() }
				<button type="submit" className="btn btn-default">Signin</button>
			</form>
		);
	}
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}


export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);