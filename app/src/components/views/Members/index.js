import React from 'react';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';

const { object } = React.PropTypes;

function Members(props) {
	const { members } = props;

	if (!isLoaded(members)) {
		return <Loader />;
	}

	// Display a button on Event that allows owner to edit members
	// Edit members contains a list of all users (owner excluded)

	// Each row has a checkbox, checked means the user is a member
	// Add/Remove members with checkbox

	return (
		<div className='members'>
			<ul>
				{members.items.map(member => (
					<li key={member.id}>{member.username}</li>
				))}
			</ul>
		</div>
	);
}

Members.propTypes = {
	members: object.isRequired
};

export default Members;
