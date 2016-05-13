import createConstants from 'helpers/createConstants';
import { parseError } from 'utils/network';

const {
	READ, READ_SUCCESS, READ_FAIL } = createConstants('dashboard');
const UPDATE_SCORE = 'dashboard_UPDATE_SCORE';

const initialState = {
	loading: {},
	loaded: {},
	error: null,
	items: {}
};

const dashboardInitialState = {
	items: {}
};

const itemInitialState = {
	scores: {}
};

function dashboardItem(state = itemInitialState, item = {}) {
	return {
		...state,
		...item,
		scores: item.scores.reduce((acc, score) => ({
			...acc,
			[score.id]: score
		}), state.scores)
	};
}

function dashboard(state = dashboardInitialState, action) {
	return {
		...state,
		...action.result,
		items: action.result.items.reduce((acc, item) => ({
			...acc,
			[item.id]: dashboardItem(state[item.id], item)
		}), state.items)
	};
}

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case READ:
			return {
				...state,
				loading: {
					...state.loading,
					[action.event]: true,
				},
				error: null
			};
		case READ_SUCCESS:
			return {
				...state,
				loading: {
					...state.loading,
					[action.result.id]: false
				},
				loaded: {
					...state.loaded,
					[action.result.id]: true
				},
				error: null,
				items: {
					...state.items,
					[action.result.id]: dashboard(state[action.result.id], action)
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
		case UPDATE_SCORE:
			const event = state.items[action.eventId];
			const item = event.items[action.eventItemId];
			return {
				...state,
				items: {
					...state.items,
					[action.eventId]: {
						...event,
						items: {
							...event.items,
							[action.eventItemId]: {
								...item,
								scores: {
									...item.scores,
									[action.id]: {
										id: action.id,
										scoreType: action.scoreTypeId,
										member: action.eventMemberId,
										value: action.value
									}
								}
							}
						}
					}
				}
			};
		default:
			return state;
	}
}

function load(event) {
	return {
		types: [READ, READ_SUCCESS, READ_FAIL],
		promise: client => client.get({
			path: `/events/${event}/dashboard`
		}),
		event
	};
}

export {
	reducer,
	load
};
