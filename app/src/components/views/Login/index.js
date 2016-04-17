import React from 'react';
import LoginForm from './LoginForm';

const { func } = React.PropTypes;

require('./login.scss');

function Login(props) {
	const { handleLogin } = props;

	return (
		<article className='login-view'>
			<p>This is the login view</p>
			<LoginForm onSubmit={handleLogin} />
		</article>
	);
}

Login.propTypes = {
	handleLogin: func.isRequired
};

export default Login;
