import { setAuth, removeAuth } from 'helpers/auth';
const LOAD = 'auth_LOAD';
const LOAD_SUCCESS = 'auth_LOAD_SUCCESS';
const LOAD_FAIL = 'auth_LOAD_FAIL';
const LOGIN = 'auth_LOGIN';
const LOGIN_SUCCESS = 'auth_LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth_LOGIN_FAIL';

const initialState = {
	token: null,
	user: null,
	loaded: false,
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loaded: true,
				token: action.result.token,
				user: action.result.data
			};
		case LOGIN_FAIL:
			return initialState;
		case LOAD_SUCCESS:
			return {
				...state,
				loaded: true,
				user: action.result
			};
		case LOAD_FAIL:
			return initialState;
		default:
			return state;
	}
}

function load() {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: client => client.get({
			path: 'auth/load'
		})
	};
}

function create(credentials) {
	return (dispatch, getState) => {
		return dispatch({
			types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
			promise: client => client.post({
				path: '/auth/local',
				payload: credentials
			})
		})
		.then(action => {
			if (action.type === LOGIN_SUCCESS) {
				setAuth(getState().auth.token);
			} else {
				removeAuth();
			}
		});
	};
}

export {
	reducer,
	load,
	create,
	LOGIN_SUCCESS,
	LOGIN_FAIL
};
