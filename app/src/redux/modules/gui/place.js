const OPEN_ADD_FORM = 'place_SHOW_ADD_FORM';
const CLOSE_ADD_FORM = 'place_CLOSE_ADD_FORM';

const initialState = {
	showAddForm: false
};

export default function placeGui(state = initialState, action = {}) {
	switch (action.type) {
		case OPEN_ADD_FORM:
			return {
				...state,
				showAddForm: true
			};
		case CLOSE_ADD_FORM:
			return {
				...state,
				showAddForm: false
			};
		default:
			return state;
	}
}

export function openAddForm() {
	return {
		type: OPEN_ADD_FORM
	};
}

export function closeAddForm() {
	return {
		type: CLOSE_ADD_FORM
	};
}
