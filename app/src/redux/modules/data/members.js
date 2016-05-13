import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
const {
	READ, READ_SUCCESS, READ_FAIL,
	CREATE, CREATE_SUCCESS, CREATE_FAIL,
	DELETE, DELETE_SUCCESS, DELETE_FAIL } = createConstants('members');

const initialState = {
	loading: {},
	loaded: {},
	error: null,
	items: {}
};

function assignMembers(state, action) {
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
				loading: {
					...state.loading,
					[action.event]: true
				}
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: {
					...state.loading,
					[action.event]: false
				},
				loaded: {
					...state.loaded,
					[action.event]: true
				},
				error: null,
				items: {
					...state.items,
					...assignMembers(state.items, action)
				}
			};
		case READ_FAIL:
			return {
				...state,
				loading: {
					...state.loading,
					[action.event]: false
				},
				loaded: {
					...state.loaded,
					[action.event]: false
				},
				error: parseError(action.error)
			};
		case CREATE_SUCCESS:
			return {
				...state,
				error: null,
				items: {
					...state.items,
					[action.result.id]: action.result
				}
			};
		case CREATE_FAIL:
			return {
				...state,
				error: parseError(action.error)
			};
		case DELETE_SUCCESS:
			const items = Object.assign({}, state.items);
			delete items[action.result.id];
			return {
				...state,
				error: null,
				items: items
			};
		case DELETE_FAIL:
			return {
				...state,
				error: parseError(state.error)
			};
		default:
			return state;
	}
}

function load(event) {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/events/${event}/members`
		}),
		event
	};
}

function create(event, payload) {
	return {
		types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
		promise: client => client.post({
			path: `/events/${event}/members`,
			payload
		})
	};
}

function remove(event, member) {
	return {
		types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
		promise: client => client.delete({
			path: `/events/${event}/members/${member}`
		})
	};
}

export {
	reducer,
	load,
	create,
	remove
};
