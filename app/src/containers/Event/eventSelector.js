import { createSelector } from 'reselect';

const eventSelector = (state, options) => state.data.events.items[options.params.id];

const dataSelector = createSelector(
	eventSelector,
	event => ({
		event
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
	eventSelector
};
