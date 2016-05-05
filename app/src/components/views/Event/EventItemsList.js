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
		return () => {
			this.setState({
				activeItem: id !== this.state.activeItem ? id : null
			});
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
	expandItem: func.isRequired,
	items: array
};

export default EventItemsList;
