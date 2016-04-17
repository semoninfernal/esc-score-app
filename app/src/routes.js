import React from 'react';
import { Route } from 'react-router';
import {
	App,
	Login
} from 'containers';

// Create a HoC-authorized route

export default (/* store */) => {
	return (
		<Route path='/' component={App}>
			<Route path='login' component={Login} />
		</Route>
	);
};
