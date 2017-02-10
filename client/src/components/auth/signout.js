import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
	// before moutning component call signoutUser
	componentWillMount(){
		this.props.signoutUser();
	}

	render(){
		return(
			<div>Sorry to see you go...</div>
		);
	}
}


export default connect(null, actions)(Signout);