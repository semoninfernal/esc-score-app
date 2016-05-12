import React from 'react';
import { Link } from 'react-router';

const { number, string } = React.PropTypes;

function EventsItem(props) {
	const { id, name } = props;

	return (
		<li>
			<Link to={`/events/1`}>{name}{id}</Link>
		</li>
	);
}

EventsItem.propTypes = {
	id: number.isRequired,
	name: string.isRequired
};

export default EventsItem;
