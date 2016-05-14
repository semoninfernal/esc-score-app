import React from 'react';

const { func } = React.PropTypes;

function LoggedInHeader(props) {
	const { logout } = props;

	return (
		<div>
			<div className='logout' onClick={() => logout()}>Logga ut</div>
		</div>
	);
}

LoggedInHeader.propTypes = {
	logout: func.isRequired
};

export default LoggedInHeader;
