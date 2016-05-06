import React from 'react';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';
import MembersList from './MembersList';

require('./members.scss');

const { object, func, bool } = React.PropTypes;

function Members(props) {
	const { users, toggleExpanded, expanded, ...rest} = props;

	if (!isLoaded(users)) {
		return <Loader />;
	}

	return (
		<div className='members'>
			<a className='btn btn-cta' onClick={toggleExpanded}>
				{!expanded ? 'Edit members' : 'Done'}
			</a>
			{expanded ? <MembersList items={users.items} {...rest} /> : null }
		</div>
	);
}

Members.propTypes = {
	expanded: bool.isRequired,
	users: object.isRequired,
	toggleExpanded: func.isRequired,
	toggleMembership: func.isRequired
};

export default Members;
