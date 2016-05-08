import React from 'react';
import { ItemScores } from 'containers';

const { bool, string, number, oneOfType, func } = React.PropTypes;

function EventItem(props) {
	const { toggleExpanded, expanded, name, description, score, eventId, id } = props;

	return (
		<li >
			<div className='item' onClick={toggleExpanded}>
				<div className='info'>
					<span className='name'>{name}</span>
					<span className='description'>{description}</span>
				</div>
				<div className='score'>
					{score}
				</div>
			</div>

			{expanded ? <ItemScores event={eventId} item={id} /> : null}
		</li>
	);
}

EventItem.propTypes = {
	description: string.isRequired,
	expanded: bool,
	name: string.isRequired,
	score: oneOfType([string, number]).isRequired,
	toggleExpanded: func.isRequired
};

export default EventItem;
