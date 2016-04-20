import authentication from 'feathers-authentication';
import { remove } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
	all: [
		auth.verifyToken(),
		auth.populateUser(),
		auth.restrictToAuthenticated()
	]
};

export const after = {
	all: [
		remove('password', 'admin')
	]
};
