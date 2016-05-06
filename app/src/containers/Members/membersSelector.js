import { createSelector } from 'reselect';

const membersSelector = ({ data: { members } }, { event }) => ({
	...members,
	loading: members.loading[event],
	loaded: members.loaded[event],
	items: Object.values(members.items)
		.filter(item => item.eventId === event)
});

const dataSelector = createSelector(
	membersSelector,
	members => ({
		members
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
	membersSelector
};
