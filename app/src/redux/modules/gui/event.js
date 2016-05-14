const SET_ACTIVE_ITEM = 'gui/event_SET_ACTIVE_ITEM';
const SET_MESSAGE = 'gui/event_SHOW_MESSAGE';

const initialState = {
	activeItem: null,
	message: null
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_ITEM:
			return {
				...state,
				activeItem: action.id
			};
		case SET_MESSAGE:
			return {
				...state,
				message: action.message
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

function setMessage(message) {
	return {
		type: SET_MESSAGE,
		message
	};
}

export {
	reducer,
	setActiveItem,
	setMessage
};
