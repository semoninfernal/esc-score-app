import React from 'react';
import { Link } from 'react-router';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';

function Events(props) {
	const { events } = props;

	if (!isLoaded(events)) {
		return <Loader />;
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
