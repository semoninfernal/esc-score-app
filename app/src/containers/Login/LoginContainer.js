import React, { Component } from 'react';
import connect from 'helpers/connect';
import { load, remove as _remove } from 'redux/modules/auth';
import Login from 'components/views/Login';

const fetch = {
	promise: ({ store: { getState, dispatch } }) => {
		const promises = [];

		if (!getState().auth.user) {
			promises.push(dispatch(load()));
		}

		return Promise.all(promises);
	}
};

const selector = (state, props) => ({
	gui: {
		user: state.auth.user,
		username: props.location.query.username,
		returnUrl: props.location.query.returnUrl
	}
});

const actions = {
	remove: _remove
};

class LoginContainer extends Component {
	render() {
		const { gui, remove } = this.props;

		return (
			<Login
				{...gui}
				logout={remove}
			/>
		);
	}
}

export default connect(fetch, selector, actions)(LoginContainer);
