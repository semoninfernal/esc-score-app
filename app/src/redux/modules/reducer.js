import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import { reducer as auth } from './auth';
import data from './data/index';
import gui from './gui/index';

export default combineReducers({
	auth,
	routing,
	reduxAsyncConnect,
	form,
	data,
	gui
});
