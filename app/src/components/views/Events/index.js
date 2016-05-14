import React from 'react';
import { Link } from 'react-router';
import { isLoaded } from 'utils/dependencies';
import Loader from 'components/shared/Loader';
import NoContent from 'components/shared/NoContent';

require('./events.scss');

function Events(props) {
	const { events } = props;

	if (!isLoaded(events)) {
		return <Loader />;
	}

	if (!events.items.length) {
		return (
			<NoContent heading='Här var det tomt!' xl>
				<p>Vänta på att något bjuder in dig eller kontakta admin för att skapa ett event.</p>
			</NoContent>
		);
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
