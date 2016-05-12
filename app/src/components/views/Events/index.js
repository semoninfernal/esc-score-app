import React from 'react';
import { Link } from 'react-router';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';

require('./events.scss');

function Events(props) {
	const { events } = props;

	if (!isLoaded(events)) {
		return <Loader />;
	}

	return (
		<article className='events'>
			<ul>
				{events.items.map(({id, name}) => (
					<li key={id}>
						<Link className='btn' to={`events/${id}`}>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</article>
	);
}

export default Events;
