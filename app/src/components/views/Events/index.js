import React from 'react';
import { Link } from 'react-router';
import { isLoaded } from 'utils/dependencies';

function Events(props) {
	const { events } = props;

	if (!isLoaded(events)) {
		return <div>Laddar</div>;
	}

	return (
		<div>
			<ul>
				{events.items.map(({id, name}) => (
					<li key={id}>
						<Link to={`/events/${id}`}>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Events;
