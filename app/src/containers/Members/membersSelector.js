import { createSelector } from 'reselect';
import { isLoaded } from 'utils/dependencies';

const usersSelector = state => state.data.users;

const membersSelector = ({ data: { members } }, { event }) => ({
	...members,
	loading: members.loading[event],
	loaded: members.loaded[event],
	items: Object.values(members.items)
		.filter(member => member.eventId === event)
});

function populateUser(user, member = {}) {
	return {
		...user,
		memberId: member.id,
		isMember: typeof member.id !== 'undefined',
		isOwner: member.owner
	};
}

function formatUsers(users, members) {
	return isLoaded(users, members) ? {
		loaded: true,
		items: Object.values(users.items)
			.map(user => populateUser(user, members.items.find(member => member.userId === user.id)))
			.filter(user => !user.isOwner)
	} : { loaded: false };
}

const dataSelector = createSelector(
	usersSelector,
	membersSelector,
	(users, members) => ({
		users: formatUsers(users, members)
	})
);

const selector = createSelector(
	dataSelector,
	data => ({
		data
	})
);

export {
	selector,
	usersSelector,
	membersSelector
};
