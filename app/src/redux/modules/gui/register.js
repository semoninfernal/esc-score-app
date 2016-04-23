import { LOCATION_CHANGE } from 'react-router-redux';
import { parseError } from 'utils/network';

const REGISTER = 'register_REGISTER';
const REGISTER_SUCCESS = 'register_REGISTER_SUCCESS';
const REGISTER_FAIL = 'register_REGISTER_FAIL';

const initialState = {
	error: null
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				username: action.result.username,
				error: null
			};
		case REGISTER_FAIL:
			return {
				...state,
				username: null,
				error: parseError(action.error)
			};
		case LOCATION_CHANGE:
			return initialState;
		default:
			return state;
	}
}

function register({username, password}) {
	return {
		types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
		promise: client => client.post({
			path: '/users',
			payload: {
				username,
				password
			}
		})
	};
}

export {
	reducer,
	register
};
