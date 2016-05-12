import React, { PropTypes } from 'react';
import { classNames } from 'utils/classNames';

require('./textInput.scss');

function TextInput(props) {
	const { error, touched, type, ...rest } = props;
	const className = classNames({
		'form-control': true,
		'error': touched && error
	});

	return (
		<div className={className}>
			<input {...rest} type={type || 'text'} />
			{ touched && error ? <p>{error}</p> : null }
		</div>

	);
}

TextInput.propTypes = {
	type: PropTypes.oneOf(['text', 'password', 'number'])
};

export default TextInput;
