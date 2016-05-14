import React from 'react';
import { classNames } from 'utils/classNames';

require('./styles/noContent.scss');

const { string, node, bool } = React.PropTypes;

function NoContent(props) {
	const { heading, children, xl } = props;
	const className = classNames({
		'no-content': true,
		xl
	});

	return (
		<div className={className}>
			<h2>{heading}</h2>
			{children}
		</div>
	);
}

NoContent.propTypes = {
	children: node,
	heading: string.isRequired,
	xl: bool
};

export default NoContent;
