import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/data/members';
import { requiresFetch } from 'utils/dependencies';
import { selector, membersSelector } from './membersSelector';
import Members from 'components/views/Members';

const { number, object } = React.PropTypes;

class MembersContainer extends Component {
	componentDidMount() {
		const { event } = this.props;
		const { dispatch, getState } = this.context.store;
		const state = getState();

		if (requiresFetch(membersSelector(state, this.props))) {
			dispatch(load(event));
		}
	}

	render() {
		const { data } = this.props;

		return (
			<Members
				{...data}
			/>
		);
	}
}

MembersContainer.propTypes = {
	event: number.isRequired
};

MembersContainer.contextTypes = {
	store: object.isRequired
};

export default connect(selector, null)(MembersContainer);
