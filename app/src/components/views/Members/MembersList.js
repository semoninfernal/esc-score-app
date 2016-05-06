import React from 'react';
import MembersItem from './MembersItem';

const { array, func } = React.PropTypes;

function MembersList(props) {
	const { items, toggleMembership } = props;

	return (
		<ul className='members-list'>
			{items.map(user => (
				<MembersItem
					key={user.id}
					user={user}
					toggleMembership={() => toggleMembership(user)}
				/>
			))}
		</ul>
	);
}

MembersList.propTypes = {
	items: array.isRequired,
	toggleMembership: func.isRequired
};

export default MembersList;
