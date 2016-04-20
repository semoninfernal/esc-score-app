import { parseError } from 'utils/network';
import {
	create as createSession,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from '../auth';


const initialState = {
	api: null
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				api: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				api: parseError(action.error)
			};
		default:
			return state;
	}
}

function login(values, dispatch) {
	return dispatch(createSession(values));
}

export {
	reducer,
	login
};
