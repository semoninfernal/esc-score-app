import { combineReducers } from 'redux';
import { reducer as login } from './login';
import { reducer as register } from './register';

export default combineReducers({
	login,
	register
});
