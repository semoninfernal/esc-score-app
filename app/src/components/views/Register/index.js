import React from 'react';
import RegisterComplete from './RegisterComplete';
import RegisterForm from './RegisterForm';

const { string } = React.PropTypes;

function Register(props) {
	const { username } = props;

	return (
		<div>
			{ username ? <RegisterComplete username={username} /> : <RegisterForm />}
		</div>
	);
}

Register.propTypes = {
	username: string
};

export default Register;
