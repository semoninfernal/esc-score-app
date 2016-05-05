import React, { Component } from 'react';
import { requiresFetch, isLoaded } from 'utils/dependencies';
import { loadOne as loadEvent } from 'redux/modules/data/events';
import { load as loadItems } from 'redux/modules/data/eventItems';
import {
	eventSelector,
	eventItemsSelector,
	selector } from './eventSelector';
import {
	setActiveItem as _setActiveItem
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
};

class EventContainer extends Component {

	onSetScore() {

	}

	onExpandItem({setActiveItem}) {
		return id => setActiveItem(id);
	}


	render() {
		const { data } = this.props;
		if (!isLoaded.apply(null, Object.values(data))) {
			return <div>LADDAR</div>;
		}

		const handlers = {
			expandItem: this.onExpandItem(this.props),
			setScore: this.setScore
		};

		return (
			<Event
				{...data}
				{...handlers}
			/>
		);
	}
}

export default connect(fetch, selector, actions)(EventContainer);
