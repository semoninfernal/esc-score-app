import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push as _push } from 'react-router-redux';
import { remove as _logout } from 'redux/modules/auth';
import App from 'components/views/App';

const { node } = React.PropTypes;

class AppContainer extends Component {
	handleLogout() {
		const { logout, push } = this.props;
		logout();
		push('/login');
	}

	render() {
		const { children, auth } = this.props;

		return (
			<App user={auth.user} logout={this.handleLogout.bind(this)}>
				{children}
			</App>
		);
	}
}

AppContainer.propTypes = {
	children: node.isRequired
};

const selector = state => ({auth: state.auth});

const actions = {
	logout: _logout,
	push: _push
};

export default connect(selector, actions)(AppContainer);
