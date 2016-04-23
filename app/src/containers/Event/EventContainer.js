import React, { Component } from 'react';
import { requiresFetch } from 'utils/dependencies';
import { load } from 'redux/modules/data/events';
import connect from 'helpers/connect';

const selector = state => ({
	events: state.data.events
});

const fetch = {
	promise: ({ store: { dispatch, getState } }) => {
		const state = getState();
		const promises = [];

		// TODO Fetch one instead
		if (requiresFetch(selector(state))) {
			promises.push(dispatch(load()));
		}

		return Promise.all(promises);
	}
};

class EventContainer extends Component {
	render() {
		const { events, params } = this.props;
		const event = events.items.find(e => e.id === parseInt(params.id, 0));

		return (
			<div>
				{event ? event.name : 'Laddar'}
			</div>
		);
	}
}

export default connect(fetch, selector)(EventContainer);
