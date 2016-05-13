import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';
export const {
	READ, READ_SUCCESS, READ_FAIL,
	CREATE, CREATE_SUCCESS, CREATE_FAIL,
	UPDATE, UPDATE_SUCCESS, UPDATE_FAIL
	} = createConstants('itemScores');

const initialState = {
	loading: {},
	loaded: {},
	error: null,
	items: {}
};

function assignItemScores(state, action) {
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
					[action.item]: true
				},
				error: null
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: {
					...state.loading,
					[action.item]: false
				},
				loaded: {
					...state.loaded,
					[action.item]: true
				},
				items: {
					...state.items,
					...assignItemScores(state.items, action)
				}
			};
		case READ_FAIL:
			return {
				...state,
				loading: {
					...state.loading,
					[action.item]: false
				},
				loaded: {
					...state.loading,
					[action.item]: false
				},
				items: {},
				error: parseError(action.error)
			};
		case CREATE_SUCCESS:
			return {
				...state,
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
		case UPDATE_SUCCESS:
			return {
				...state,
				items: {
					...state.items,
					[action.result.id]: action.result
				}
			};
		case UPDATE_FAIL:
			return {
				...state,
				error: parseError(action.error)
			};
		default:
			return state;
	}
}

function load(event, item) {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/events/${event}/items/${item}/scores`
		}),
		item
	};
}

function create(eventId, itemId, payload) {
	return {
		types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
		promise: client => client.post({
			path: `/events/${eventId}/items/${itemId}/scores`,
			payload
		})
	};
}

function update(eventId, itemId, scoreId, payload) {
	return {
		types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
		promise: client => client.patch({
			path: `/events/${eventId}/items/${itemId}/scores/${scoreId}`,
			payload
		})
	};
}

export {
	reducer,
	load,
	create,
	update
};
