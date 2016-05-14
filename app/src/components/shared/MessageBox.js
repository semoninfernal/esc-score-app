import React from 'react';
import { classNames } from 'utils/classNames';

require('./styles/messageBox.scss');

const { string, bool } = React.PropTypes;

function MessageBox(props) {
	const { error, message } = props;
	const className = classNames({
		'message-box': true,
		error
	});

	return (
		<div className={className}>
			<p>{message}</p>
		</div>
	);
}

MessageBox.propTypes = {
	error: bool,
	message: string.isRequired
};

export default MessageBox;
