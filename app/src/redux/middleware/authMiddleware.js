import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from 'redux/modules/auth';
import { setAuth, removeAuth } from 'helpers/auth';

const authMiddleware = ({getState}) => next => action => {
	const result = next(action);

	if (action.type === LOGIN_SUCCESS) {
		setAuth(getState().auth.token);
	}
	if (action.type === LOGIN_FAIL || action.type === LOGOUT) {
		removeAuth();
	}

	return result;
};

export default authMiddleware;
