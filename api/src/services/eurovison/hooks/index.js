import authentication from 'feathers-authentication';

const auth = authentication.hooks;

function test() {
	return hook => {
		return hook;
	}
}

export const before = {
	all: [
		auth.verifyToken(),
		auth.populateUser(),
		auth.restrictToAuthenticated()
	]
};

export const after = {
	all: [
		test()
	]
};
