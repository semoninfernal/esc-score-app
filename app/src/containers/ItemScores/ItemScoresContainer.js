import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requiresFetch } from 'utils/dependencies';
import {
	load as loadScores,
	create as _create,
	update as _update } from 'redux/modules/data/itemScores';
import { load as loadScoreTypes } from 'redux/modules/data/scoreTypes';
import {
	itemScoresSelector,
	scoreTypesSelector,
	selector
} from './itemScoresSelector';
import ItemScores from 'components/views/ItemScores';

const { number, object, func } = React.PropTypes;

// This component should have a debouncing setScoreThing

// It needs to alter between create and update when value goes from null to anything

class ItemScoresContainer extends Component {
	componentDidMount() {
		const { event, item, update, create } = this.props;
		const { getState, dispatch } = this.context.store;
		const state = getState();

		if (requiresFetch(itemScoresSelector(state, this.props))) {
			dispatch(loadScores(event, item));
		}

		if (requiresFetch(scoreTypesSelector(state, this.props))) {
			dispatch(loadScoreTypes(event));
		}

		this.createScore = payload => create(event, item, payload);
		this.updateScore = (id, payload) => update(event, item, id, payload);
	}

	handleScoreChange() {
		return (id, scoreTypeId, value) => {
			console.log(id, scoreTypeId, value);
			if (typeof id === 'undefined') {
				this.createScore({value, scoreTypeId});
			} else {
				this.updateScore(id, {value});
			}
		};
	}

	render() {
		const { data, close } = this.props;

		const handlers = {
			onScoreChange: this.handleScoreChange(),
			close
		};

		return (
			<ItemScores
				{...data}
				{...handlers}
			/>
		);
	}
}

ItemScoresContainer.propTypes = {
	event: number.isRequired,
	item: number.isRequired,
	close: func.isRequired,
};

ItemScoresContainer.contextTypes = {
	store: object.isRequired
};

const actions = {
	create: _create,
	update: _update
};

export default connect(selector, actions)(ItemScoresContainer);
