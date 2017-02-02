import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component{
	
	handleSubmitForm({email, password}){
		console.log(email, password);
		// need to do sth when user login
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
				<button action="submit" className="btn btn-default">Signin</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
})(Signin);