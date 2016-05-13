import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
export const {
	READ, READ_SUCCESS, READ_FAIL
	} = createConstants('scoreTypes');

// TODO This should probably be included in the /events/:id service

const initialState = {
	loading: false,
	loaded: false,
	error: null,
	items: {}
};

function assignScoreTypes(state, items) {
	return items.reduce((acc, item) => ({
		...acc,
		[item.id]: item
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
				items: assignScoreTypes(state.items, action.result)
			};
		case READ_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				items: {},
				error: parseError(action.error)
			};
		default:
			return state;
	}
}

function load(eventId) {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/events/${eventId}/scoreTypes`
		})
	};
}

export {
	reducer,
	load,
};
