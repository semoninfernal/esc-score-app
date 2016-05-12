import React from 'react';

const { string, func } = React.PropTypes;

function LoggedInHeader(props) {
	const { logout, username } = props;

	return (
		<div>
			<div className='username'>{username}</div>
			<div className='logout' onClick={() => logout()}>Logga ut</div>
		</div>
	);
}

LoggedInHeader.propTypes = {
	logout: func.isRequired,
	username: string.isRequired
};

export default LoggedInHeader;
