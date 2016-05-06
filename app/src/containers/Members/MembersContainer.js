import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	load as loadMembers,
	create as _addMember,
	remove as _removeMember } from 'redux/modules/data/members';
import { load as loadUsers } from 'redux/modules/data/users';
import { requiresFetch } from 'utils/dependencies';
import { selector, membersSelector, usersSelector } from './membersSelector';
import Members from 'components/views/Members';

const { number, object, func } = React.PropTypes;

class MembersContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};

		this._handleToggleExpanded = this.handleToggleExpanded.bind(this);
		this._handleToggleMembership = this.handleToggleMembership.bind(this);
	}

	componentDidMount() {
		const { event } = this.props;
		const { dispatch, getState } = this.context.store;
		const state = getState();

		if (requiresFetch(membersSelector(state, this.props))) {
			dispatch(loadMembers(event));
		}

		if (requiresFetch(usersSelector(state))) {
			dispatch(loadUsers());
		}
	}

	handleToggleExpanded() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	handleToggleMembership(user) {
		const { event, addMember, removeMember } = this.props;
		if (user.isMember) {
			removeMember(event, user.memberId);
		} else {
			addMember(event, { userId: user.id});
		}
	}

	render() {
		const { data } = this.props;

		const handlers = {
			toggleExpanded: this._handleToggleExpanded,
			toggleMembership: this._handleToggleMembership
		};

		return (
			<Members
				{...data}
				{...handlers}
				{...this.state}
			/>
		);
	}
}

MembersContainer.propTypes = {
	addMember: func.isRequired,
	event: number.isRequired,
	removeMember: func.isRequired
};

MembersContainer.contextTypes = {
	store: object.isRequired
};

const actions = {
	addMember: _addMember,
	removeMember: _removeMember
};

export default connect(selector, actions)(MembersContainer);
