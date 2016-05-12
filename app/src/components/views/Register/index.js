import React from 'react';
import RegisterComplete from './RegisterComplete';
import RegisterForm from './RegisterForm';

require('./register.scss');

const { string } = React.PropTypes;

function Register(props) {
	const { username } = props;

	return (
		<article className='register'>
			{ username ? <RegisterComplete username={username} /> : <RegisterForm />}
		</article>
	);
}

Register.propTypes = {
	username: string
};

export default Register;
