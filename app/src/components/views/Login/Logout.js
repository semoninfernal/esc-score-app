import React from 'react';
import Button from 'components/shared/Button';

const { func } = React.PropTypes;

function Logout(props) {
	const { logout } = props;

	return (
		<div>
			<Button cta type='button' onClick={logout}>Log out</Button>
		</div>
	);
}

Logout.propTypes = {
	logout: func.isRequired
};

export default Logout;
