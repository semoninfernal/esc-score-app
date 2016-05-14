import React from 'react';
import { Link } from 'react-router';
import BackLink from 'components/shared/BackLink';
import EventItemsList from './EventItemsList';
import { Members } from 'containers';

require('./event.scss');

const { object, func } = React.PropTypes;

function Event(props) {
	const { event, eventItems: { items }, expandItem } = props;

	return (
		<article className='event'>
			<div className='container'>
				<BackLink text='Välj event' to='/events' />
				<h1>{event.name}</h1>
				<EventItemsList expandItem={expandItem} items={items} />
				{ event.owner ? <Members event={event.id} /> : null }
				<Link className='btn dashboard-link' to={`/events/${event.id}/dashboard`}>Dashboard</Link>
			</div>
		</article>
	);
}

Event.propTypes = {
	event: object.isRequired,
	expandItem: func.isRequired
};

export default Event;
