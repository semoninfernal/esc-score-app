import React from 'react';
import { Link } from 'react-router';
import BackLink from 'components/shared/BackLink';
import EventItemsList from './EventItemsList';
import { Members } from 'containers';
import { Checkbox } from 'components/shared/form';
import MessageBox from 'components/shared/MessageBox';

require('./event.scss');

const { object, func } = React.PropTypes;

function Event(props) {
	const { event, eventItems: { items }, toggleActive, setMessage, message } = props;

	return (
		<article className='event'>
			<div className='container'>
				<div className='event-header'>
					<BackLink text='Välj event' to='/events' />
					{event.owner ? <Checkbox checked={event.active} id='chk-active' label='Aktivt' onChange={toggleActive} /> : null}
				</div>
				<h1>{event.name}</h1>
				{!event.active && message ? <MessageBox message={message} /> : null}
				<EventItemsList items={items} setMessage={setMessage} locked={!event.active} />
				{ event.owner ? <Members event={event.id} /> : null }
				<Link className='btn dashboard-link' to={`/events/${event.id}/dashboard`}>Dashboard</Link>
			</div>
		</article>
	);
}

Event.propTypes = {
	event: object.isRequired,
	toggleActive: func.isRequired
};

export default Event;
