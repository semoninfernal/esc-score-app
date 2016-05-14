import React from 'react';
import { Checkbox } from 'components/shared/form';

const { object, func } = React.PropTypes;

function MembersItem(props) {
	const { user: { username, id, isMember }, toggleMembership } = props;
	const inputId = `user_${id}`;

	return (
		<li className='member'>
			<Checkbox checked={isMember} id={inputId} label={username} onChange={toggleMembership} />
		</li>
	);
}

MembersItem.propTypes = {
	user: object.isRequired,
	toggleMembership: func.isRequired
};

export default MembersItem;
