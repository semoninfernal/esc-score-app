import React from 'react';
import { Route } from 'react-router';
import {
	App
} from 'containers';

// Create a HoC-authorized route

export default (/* store */) => {
	return (
		<Route path='/' component={App} />
	);
};
