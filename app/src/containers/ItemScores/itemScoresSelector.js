import { createSelector } from 'reselect';
import { isLoaded } from 'utils/dependencies';

function sortScore(a, b) {
	const aVal = a.name;
	const bVal = b.name;
	if (aVal < bVal) return -1;
	if (aVal > bVal) return 1;
	return 0;
}

function formatScore(score, scoreType) {
	const _score = score || {};
	return {
		id: _score.id,
		name: scoreType.name,
		max: scoreType.max,
		min: scoreType.min,
		scoreType: scoreType.id,
		value: _score.value
	};
}

function formatScores(scores, scoreTypes) {
	return isLoaded(scores, scoreTypes) ? {
		loaded: true,
		items: scoreTypes.items.map(scoreType => formatScore(
			scores.items.find(score => score.scoreTypeId === scoreType.id),
			scoreType
		)).sort(sortScore)
	} : { loaded: false };
}

const itemScoresSelector = ({ data: { itemScores }}, props) => ({
	...itemScores,
	loading: itemScores.loading[props.item],
	loaded: itemScores.loaded[props.item],
	items: Object.values(itemScores.items)
		.filter(score => score.eventItemId === props.item)
});

// TODO handle score types in the same way as scores
const scoreTypesSelector = (state, props) => ({
	...state.data.scoreTypes,
	items: Object.values(state.data.scoreTypes.items)
		.filter(scoreType => scoreType.eventId === props.event)
});

const dataSelector = createSelector(
	itemScoresSelector,
	scoreTypesSelector,
	(itemScores, scoreTypes) => ({
		scores: formatScores(itemScores, scoreTypes)
	})
);

const selector = createSelector(
	dataSelector,
	(data) => ({
		data
	})
);

export {
	itemScoresSelector,
	scoreTypesSelector,
	selector
};
