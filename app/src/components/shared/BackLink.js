import React from 'react';
import { Link } from 'react-router';

require('./styles/backLink.scss');

const { string } = React.PropTypes;

function BackLink(props) {
	const { text, to } = props;

	return <Link className='back-link' to={to}>{text}</Link>;
}

BackLink.propTypes = {
	text: string.isRequired,
	to: string.isRequired
};

export default BackLink;
