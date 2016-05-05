import { combineReducers } from 'redux';
import { reducer as event } from './event';
import { reducer as login } from './login';
import { reducer as register } from './register';

export default combineReducers({
	event,
	login,
	register
});
