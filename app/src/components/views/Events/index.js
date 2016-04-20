import React from 'react';
import { isLoaded } from 'utils/dependencies';

function Events(props) {
	const { events } = props;

	if (!isLoaded(events)) {
		return <div>Laddar</div>;
	}

	return (
		<div>
			<ul>
				{events.items.map(({id, name, owner}) => (
					<li key={id}>
						{name}{owner ? <span> DU ÄGER</span> : null}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Events;
