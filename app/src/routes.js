import React from 'react';
import { isLoaded } from 'utils/dependencies';
import { load } from 'redux/modules/auth';
import { Route, IndexRedirect } from 'react-router';
import {
	App,
	Event,
	Events,
	Login,
	NotFound,
	Register
} from 'containers';

// Create a HoC-authorized route

export default (store) => {
	const requireLogin = (nextState, replace, cb) => {
		function checkAuth() {
			const { auth: { user } } = store.getState();
			const { location: { pathname } } = nextState;

			if (!user) {
				replace(`/login${pathname ? '?returnUrl=' + pathname : ''}`);
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
			<IndexRedirect to='/events' />
			<Route path='login' component={Login} />
			<Route path='register' component={Register} />
			<Route onEnter={requireLogin}>
				<Route path='events' component={Events} />
				<Route path='events/:id' component={Event} />
			</Route>
			<Route path='*' name='notFound' component={NotFound} status='404' />
		</Route>
	);
};
