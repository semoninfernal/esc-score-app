import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
const {
	READ, READ_SUCCESS, READ_FAIL } = createConstants('users');

const initialState = {
	loading: false,
	loaded: false,
	error: null,
	items: {}
};

function assignUsers(state, action) {
	return action.result.reduce((acc, item) => ({
		...acc,
		[item.id]: item
	}), state);
}

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case READ:
			return {
				...state,
				loading: true
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				error: null,
				items: {
					...state.items,
					...assignUsers(state.items, action)
				}
			};
		case READ_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: parseError(action.error)
			};
		default:
			return state;
	}
}

function load() {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/users`
		})
	};
}

export {
	reducer,
	load
};
