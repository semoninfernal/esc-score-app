import { parseError } from 'utils/network';
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from '../auth';


const initialState = {
	error: null
};

function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				error: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				error: parseError(action.error)
			};
		default:
			return state;
	}
}

export {
	reducer
};
