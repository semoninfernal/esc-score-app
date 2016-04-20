import React from 'react';
import LoginForm from './LoginForm';

require('./login.scss');

const { string } = React.PropTypes;

function Login(props) {
	const { username } = props;
	// TODO Add support for return url

	return (
		<article className='login-view'>
			<p>This is the login view</p>
			<LoginForm initialValues={{username}} />
		</article>
	);
}

Login.propTypes = {
	username: string
};

export default Login;
