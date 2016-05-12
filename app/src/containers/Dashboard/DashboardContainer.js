import React, { Component } from 'react';
import connect from 'helpers/connect';
import { requiresFetch, isLoaded } from 'utils/dependencies';
import {
	load as loadDashboard } from 'redux/modules/data/dashboards';
import {
	load as loadMembers } from 'redux/modules/data/members';
import {
	update as _update } from 'redux/modules/data/itemScores';
import {
	selector,
	membersSelector } from './dashboardSelecor';
import Dashboard from 'components/views/Dashboard';

const fetch = {
	promise: options => {
		const { store: { dispatch, getState }, params: { id } } = options;
		const state = getState();
		const promises = [
			dispatch(loadDashboard(id))
		];

		if (requiresFetch(membersSelector(state, options))) {
			promises.push(dispatch(loadMembers(id)));
		}

		return Promise.all(promises);
	}
};

class DashboardContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			update: false
		};
	}

	componentDidMount() {
		const { params: { id } } = this.props;

		this.pull = setInterval(() => {
			if (this.state.update) {
				this.props.loadDashboard(id);
			}
		}, 3000);
	}

	componentWillUnmount() {
		clearInterval(this.pull);
	}

	onToggleUpdate() {
		this.setState({ update: !this.state.update });
	}

	render() {
		const { data, update } = this.props;

		if (!isLoaded(data.dashboard)) {
			return <div>LADDAR</div>;
		}

		const handlers = {
			toggleUpdate: this.onToggleUpdate.bind(this),
			update,
			reload: this.props.loadDashboard
		};

		return (
			<Dashboard
				{...data}
				{...handlers}
			/>
		);
	}
}

const actions = {
	loadDashboard,
	update: _update
};

export default connect(fetch, selector, actions)(DashboardContainer);
