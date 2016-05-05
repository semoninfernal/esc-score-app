import React, { Component } from 'react';
import { connect } from 'redux';
import { isLoaded } from 'utils/dependencies';

const { number, func } = React.PropTypes;

// This component should have a debouncing setScoreThing

// It needs to alter between create and update when value goes from null to anything

class ItemScores extends Component {
	componentDidMount() {
		const { event, item, loadScores } = this.props;

		loadScores(event, item);
	}

	render() {
		return (
			<div>Item scores</div>
		);
	}
}

ItemScores.propTypes = {
	event: number.isRequired,
	item: number.isRequired,
	loadScores: func.isRequired
}

export default ItemScores;
