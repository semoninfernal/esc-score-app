import React, { Component } from 'react';
import Login from 'components/views/Login';

class LoginContainer extends Component {
	render() {
		const { location } = this.props;
		const data = {
			...location.query
		};

		return (
			<Login
				{...data}
			/>
		);
	}
}

export default LoginContainer;
