import React, { Component } from 'react';
import connect from 'helpers/connect';
import { requiresFetch, isLoaded } from 'utils/dependencies';
import {
	load as loadDashboard,
	updateScore as _updateScore } from 'redux/modules/data/dashboards';
import {
	load as loadMembers } from 'redux/modules/data/members';
import {
	selector,
	dashboardSelector,
	membersSelector } from './dashboardSelecor';
import Dashboard from 'components/views/Dashboard';

const fetch = {
	deferred: true,
	promise: options => {
		const { store: { dispatch, getState }, params: { id } } = options;
		const state = getState();
		const promises = [];

		if (requiresFetch(dashboardSelector(state, options))) {
			promises.push(dispatch(loadDashboard(id)));
		}

		if (requiresFetch(membersSelector(state, options))) {
			promises.push(dispatch(loadMembers(id)));
		}

		return Promise.all(promises);
	}
};

class DashboardContainer extends Component {
	onUpdateScore() {
		const { updateScore } = this.props;

		updateScore({
			id: 1,
			eventMemberId: 1,
			scoreTypeId: 1,
			eventItemId: 1,
			value: 10,
			eventId: 1
		});
	}

	render() {
		const { data } = this.props;

		if (!isLoaded(data.dashboard)) {
			return <div>LADDAR</div>;
		}

		return (
			<Dashboard
				{...data}
			/>
		);
	}
}

const actions = {
	updateScore: _updateScore
};

export default connect(fetch, selector, actions)(DashboardContainer);
