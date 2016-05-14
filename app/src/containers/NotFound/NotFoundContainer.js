import React, { Component } from 'react';
import NoContent from 'components/shared/NoContent';
import { Link } from 'react-router';

class NotFoundContainer extends Component {
	render() {
		return (
			<NoContent heading='404 Inget här' xl>
				<p>Det du letar efter saknas, kolla <Link to='/events'>här</Link> istället!.</p>
			</NoContent>
		);
	}
}

export default NotFoundContainer;
