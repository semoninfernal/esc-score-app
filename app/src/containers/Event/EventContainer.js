import React, { Component } from 'react';
import { requiresFetch, isLoaded } from 'utils/dependencies';
import { loadOne } from 'redux/modules/data/events';
import { eventSelector, selector } from './eventSelector';
import connect from 'helpers/connect';


const fetch = {
	promise: options => {
		const { store: { dispatch, getState }, params: { id } } = options;
		const state = getState();
		const promises = [];

		if (requiresFetch(eventSelector(state, options))) {
			promises.push(dispatch(loadOne(id)));
		}

		return Promise.all(promises);
	}
};

class EventContainer extends Component {
	render() {
		const { data: { event } } = this.props;
		if (!isLoaded(event)) {
			return <div>LADDAR</div>;
		}
		return (
			<div>
				{event.name}
			</div>
		);
	}
}

export default connect(fetch, selector)(EventContainer);
