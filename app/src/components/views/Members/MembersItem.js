import React from 'react';

const { object, func } = React.PropTypes;

function MembersItem(props) {
	const { user: { username, id, isMember }, toggleMembership } = props;
	const inputId = `user_${id}`;

	return (
		<li className='member'>
			<input id={inputId} type='checkbox' checked={isMember} onChange={toggleMembership} />
			<label htmlFor={inputId}>{username}<span className='checkbox' /></label>
		</li>
	);
}

MembersItem.propTypes = {
	user: object.isRequired,
	toggleMembership: func.isRequired
};

export default MembersItem;
