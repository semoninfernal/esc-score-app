import React from 'react';
import RegisterComplete from './RegisterComplete';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router';

require('./register.scss');

const { string } = React.PropTypes;

function Register(props) {
	const { username } = props;

	return (
		<article className='register'>
			{ username ? <RegisterComplete username={username} /> : <RegisterForm />}
			<p className='login-link'><Link to='/login'>Logga in</Link></p>
		</article>
	);
}

Register.propTypes = {
	username: string
};

export default Register;
