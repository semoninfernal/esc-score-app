import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
export const {
	READ, READ_SUCCESS, READ_FAIL
	} = createConstants('eventItems');

// TODO This should be included in the /events/:id service instead

const initialState = {
	loading: false,
	loaded: false,
	error: null,
	items: {}
};

function assignEventItems(state, action) {
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
				loading: true,
				error: null
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				items: assignEventItems(state.items, action)
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
			path: `/events/${eventId}/items`
		})
	};
}

export {
	reducer,
	load,
};
