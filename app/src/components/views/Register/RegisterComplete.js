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
		<div className='complete'>
			<h1>Välkommen {username}!</h1>
			<p>Klicka <Link to={login}>här</Link> för att logga in</p>
		</div>
	);
}

RegisterComplete.propTypes = {
	username: string.isRequired
};

export default RegisterComplete;
