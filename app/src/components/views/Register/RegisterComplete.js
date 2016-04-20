import React from 'react';
import { Link } from 'react-router';

const { string } = React.PropTypes;

function RegisterComplete(props) {
	const { username } = props;
	const login = {
		pathname: '/login',
		query: {
			username
		}
	};

	return (
		<div>
			<p>Registration complete, <Link to={login}>log in</Link>.</p>
		</div>
	);
}

RegisterComplete.propTypes = {
	username: string.isRequired
};

export default RegisterComplete;
