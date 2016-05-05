import React from 'react';
import { Link } from 'react-router';
import EventItemsList from './EventItemsList';

const { object, func } = React.PropTypes;

function Event(props) {
	const { event, eventItems: { items }, expandItem } = props;

	return (
		<div>
			<Link to='/events'>Events</Link>
			<p>{event.name}</p>
			<EventItemsList expandItem={expandItem} items={items} />
		</div>
	);
}

Event.propTypes = {
	event: object.isRequired,
	expandItem: func.isRequired
};

export default Event;
