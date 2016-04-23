import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import { LOGOUT } from './auth';

import { reducer as auth } from './auth';
import data from './data/index';
import gui from './gui/index';

const rootReducer = combineReducers({
	auth,
	routing,
	reduxAsyncConnect,
	form,
	data,
	gui
});

export default (state, action = {}) => {
	let _state = state;
	if (action.type === LOGOUT) {
		_state = void 0;
	}
	return rootReducer(_state, action);
};
