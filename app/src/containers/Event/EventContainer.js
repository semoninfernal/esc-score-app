import React, { Component } from 'react';
import { requiresFetch, isLoaded } from 'utils/dependencies';
import {
	loadOne as loadEvent,
	update as _update } from 'redux/modules/data/events';
import { load as loadItems } from 'redux/modules/data/eventItems';
import {
	eventSelector,
	eventItemsSelector,
	selector } from './eventSelector';
import {
	setActiveItem as _setActiveItem,
	setMessage as _setMessage,
} from 'redux/modules/gui/event';
import connect from 'helpers/connect';
import Event from 'components/views/Event';


const fetch = {
	promise: options => {
		const { store: { dispatch, getState }, params: { id } } = options;
		const state = getState();
		const promises = [];

		if (requiresFetch(eventSelector(state, options))) {
			promises.push(dispatch(loadEvent(id)));
		}

		if (requiresFetch(eventItemsSelector(state, options))) {
			promises.push(dispatch(loadItems(id)));
		}

		return Promise.all(promises);
	}
};

const actions = {
	setActiveItem: _setActiveItem,
	setMessage: _setMessage,
	update: _update
};

class EventContainer extends Component {
	handleToggleActive({update, data: { event }}) {
		return () => {
			update(event.id, {active: !event.active});
		};
	}

	handleSetMessage({setMessage}) {
		return (message) => {
			setMessage(message);
		};
	}


	render() {
		const { data, gui } = this.props;
		if (!isLoaded.apply(null, Object.values(data))) {
			return <div>LADDAR</div>;
		}

		const handlers = {
			toggleActive: this.handleToggleActive(this.props),
			setMessage: this.handleSetMessage(this.props)
		};

		return (
			<Event
				{...data}
				{...gui}
				{...handlers}
			/>
		);
	}
}

export default connect(fetch, selector, actions)(EventContainer);
