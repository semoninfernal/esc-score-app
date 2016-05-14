import { createSelector } from 'reselect';
import { sumBy } from 'utils/lodash';
import { isLoaded } from 'utils/dependencies';

function filterEventItems(state, { params: { id }}) {
	return Object.values(state.items).filter(item => item.eventId === parseInt(id, 0));
}

const eventSelector = (state, options) => state.data.events.items[options.params.id];
const eventItemsSelector = (state, options) => ({
	...state.data.eventItems,
	items: filterEventItems(state.data.eventItems, options)
});
const itemScoresSelector = state => Object.values(state.data.itemScores.items);
const guiSelector = state => state.gui.event;

function formatEvent(event) {
	return isLoaded(event) ? {
		...event
	} : event;
}

function formatEventItem(item, scores) {
	const itemScores = scores.filter(score => score.eventItemId === item.id);
	const calcScore = itemScores.length ? sumBy(itemScores, 'value') : null;
	return {
		...item,
		score: (calcScore !== null ? calcScore : item.score) || '-'
	};
}

function formatEventItems(eventItems, itemScores) {
	return isLoaded(eventItems) ? {
		...eventItems,
		items: eventItems.items.map(item => formatEventItem(item, itemScores))
	} : eventItems;
}

const dataSelector = createSelector(
	eventSelector,
	eventItemsSelector,
	itemScoresSelector,
	(event, eventItems, itemScores) => ({
		event: formatEvent(event),
		eventItems: formatEventItems(eventItems, itemScores),
	})
);

const selector = createSelector(
	dataSelector,
	guiSelector,
	(data, gui) => ({
		data,
		gui
	})
);

export {
	selector,
	eventSelector,
	eventItemsSelector
};
