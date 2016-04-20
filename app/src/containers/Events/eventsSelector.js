import { createSelector } from 'reselect';

const eventsSelector = state => state.data.events;

const selector = createSelector(
	[eventsSelector],
	(events) => ({
		data: {
			events
		}
	})
);

export {
	selector,
	eventsSelector
};
