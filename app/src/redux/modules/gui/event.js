const SET_ACTIVE_ITEM = 'gui/event_SET_ACTIVE_ITEM';

const initialState = {
	activeItem: null
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_ITEM:
			return {
				...state,
				activeItem: action.id
			};
		default:
			return state;
	}
}

function setActiveItem(id) {
	return {
		type: SET_ACTIVE_ITEM,
		id
	};
}

export {
	reducer,
	setActiveItem
};
