import React, { Component } from 'react';
import connect from 'helpers/connect';
import { requiresFetch } from 'utils/dependencies';
import { load } from 'redux/modules/data/events';
import { selector, eventsSelector } from './eventsSelector';
import Events from 'components/views/Events';

const fetch = {
	promise: ({ store: { dispatch, getState } }) => {
		const state = getState();
		const promises = [];

		if (requiresFetch(eventsSelector(state))) {
			promises.push(dispatch(load()));
		}

		return Promise.all(promises);
	}
};

class EventsContainer extends Component {
	render() {
		const { data } = this.props;

		return (
			<Events
				{...data}
			/>
		);
	}
}

export default connect(fetch, selector, {})(EventsContainer);
