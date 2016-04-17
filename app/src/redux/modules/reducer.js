import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import data from './data/index';
// import gui from './gui/index';

export default combineReducers({
	routing,
	reduxAsyncConnect,
	form,
	data,
	// gui
});
