import errors from 'feathers-errors';

class AuthService {
	find(params) {
		if (params.user) {
			return Promise.resolve(params.user)
		} else {
			return Promise.reject(new errors.NotAuthenticated('Not authenticated'));
		}
	}
}

export default AuthService;
