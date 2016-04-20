import React from 'react';
import { isLoaded } from 'utils/dependencies';
import { load } from 'redux/modules/auth';
import { Route } from 'react-router';
import {
	App,
	Events,
	Login,
	Register
} from 'containers';

// Create a HoC-authorized route

export default (store) => {
	const requireLogin = (nextstate, replace, cb) => {
		function checkAuth() {
			const { auth: { user } } = store.getState();
			if (!user) {
				replace('/login');
			}
			cb();
		}

		if (!isLoaded(store.getState().auth)) {
			store.dispatch(load()).then(checkAuth);
		} else {
			checkAuth();
		}
	};


	return (
		<Route path='/' component={App}>
			<Route path='login' component={Login} />
			<Route path='register' component={Register} />
			<Route onEnter={requireLogin}>
				<Route path='events' component={Events} />
			</Route>
		</Route>
	);
};
