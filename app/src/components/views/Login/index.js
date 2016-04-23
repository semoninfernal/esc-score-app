import React from 'react';
import LoginForm from './LoginForm';
import Logout from './Logout';

require('./login.scss');

const { func, string } = React.PropTypes;

function Login(props) {
	const { username, returnUrl, logout, user } = props;

	return (
		<article className='login-view'>
			{ !user ? <LoginForm initialValues={{ username }} returnUrl={returnUrl} /> : <Logout logout={logout} /> }
		</article>
	);
}

Login.propTypes = {
	logout: func.isRequired,
	returnUrl: string,
	username: string
};

export default Login;
