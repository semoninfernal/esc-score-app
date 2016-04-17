import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login as _login } from 'redux/modules/data/auth';
import Login from 'components/views/Login';

const actions = {
	login: _login
};

class LoginContainer extends Component {
	render() {
		const { login } = this.props;
		const handlers = {
			handleLogin: login
		};

		return (
			<Login
				{...handlers}
			/>
		);
	}
}

export default connect(
	null,
	actions
)(LoginContainer);
