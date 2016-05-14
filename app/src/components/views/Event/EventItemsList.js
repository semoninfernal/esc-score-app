import React, { Component } from 'react';
import EventItem from './EventItem';

require('./eventItemsList.scss');

const { array, func } = React.PropTypes;

class EventItemsList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	setActiveItem(id) {
		const { locked, setMessage } = this.props;
		return () => {
			if (!locked) {
				this.setState({
					activeItem: id !== this.state.activeItem ? id : null
				});
			} else {
				setMessage('Detta event är låst');
			}

		};
	}

	render() {
		const { items } = this.props;
		const { activeItem } = this.state;

		return (
			<ul className='event-items-list'>
				{items.map(item => (
					<EventItem
						expanded={item.id === activeItem}
						key={item.id}
						toggleExpanded={this.setActiveItem(item.id)}
						{...item}
					/>
				))}
			</ul>
		);
	}
}

EventItemsList.propTypes = {
	items: array,
	setMessage: func.isRequired
};

export default EventItemsList;
