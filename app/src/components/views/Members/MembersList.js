import React from 'react';
import MembersItem from './MembersItem';
import NoContent from 'components/shared/NoContent';

const { array, func } = React.PropTypes;

function MembersList(props) {
	const { items, toggleMembership } = props;

	if (!items.length) {
		return (
			<NoContent heading='Det finns inga användare'>
				<p>Säg till dina vänner att registrera sig!</p>
			</NoContent>
		);
	}

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
