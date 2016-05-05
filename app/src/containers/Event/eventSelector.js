import { createSelector } from 'reselect';
import { isLoaded } from 'utils/dependencies';

function filterEventItems(state, { params: { id }}) {
	return Object.values(state.items).filter(item => item.eventId === parseInt(id, 0));
}

const eventSelector = (state, options) => state.data.events.items[options.params.id];
const eventItemsSelector = (state, options) => ({
	...state.data.eventItems,
	items: filterEventItems(state.data.eventItems, options)
});

function formatEvent(event) {
	return isLoaded(event) ? {
		...event
	} : event;
}

function formatEventItems(eventItems) {
	return isLoaded(eventItems) ? {
		...eventItems,
		items: eventItems.items.map(item => ({
			...item,
			score: item.score || '-'
		}))
	} : eventItems;
}

const dataSelector = createSelector(
	eventSelector,
	eventItemsSelector,
	(event, eventItems, scoreTypes) => ({
		event: formatEvent(event, scoreTypes),
		eventItems: formatEventItems(eventItems)
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
	eventSelector,
	eventItemsSelector
};
