import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
export const {
	READ, READ_SUCCESS, READ_FAIL,
	READ_ONE, READ_ONE_SUCCESS, READ_ONE_FAIL,
	CREATE, CREATE_SUCCESS, CREATE_FAIL
} = createConstants('events');

const initialState = {
	loaded: false,
	loading: false,
	error: null,
	items: {}
};

function event(item) {
	return {
		...item,
		loading: false,
		loaded: true,
		error: null
	};
}

function eventReducer(state, action) {
	switch (action.type) {
		case READ_ONE:
			return {
				...state,
				loading: true,
				error: null
			};
		case READ_ONE_SUCCESS:
			return event(action.result);
		case READ_ONE_FAIL:
			return {
				loading: false,
				loaded: false,
				error: parseError(action.error)
			};
		default:
			return state;
	}
}

function assignEvents(state, action) {
	return action.result.reduce((acc, item) => ({
		...acc,
		[item.id]: event(item)
	}), state);
}

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case READ:
			return {
				...state,
				loading: true,
				error: null
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				items: assignEvents(state.items, action)
			};
		case READ_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				items: {},
				error: parseError(action.error)
			};
		case READ_ONE:
		case READ_ONE_SUCCESS:
		case READ_ONE_FAIL:
			return {
				...state,
				items: {
					...state.items,
					[action.id]: eventReducer(state.items[action.id], action)
				}
			};
		default:
			return state;
	}
}

function load() {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: '/events'
		})
	};
}

function loadOne(id) {
	return {
		types: [READ_ONE, READ_ONE_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/events/${id}`
		}),
		id
	};
}

function create(payload) {
	return {
		types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
		promise: client => client.post('/events', {
			payload
		})
	};
}

export {
	reducer,
	load,
	loadOne,
	create
};
