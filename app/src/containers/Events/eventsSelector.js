import { createSelector } from 'reselect';

const eventsSelector = state => state.data.events;

const dataSelector = createSelector(
	eventsSelector,
	events => ({
		events: {
			...events,
			items: Object.keys(events.items).map(id => events.items[id])
		}
	})
);

const selector = createSelector(
	dataSelector,
	(data) => ({
		data
	})
);

export {
	selector,
	eventsSelector
};
