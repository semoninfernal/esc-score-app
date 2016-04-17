import React, { PropTypes } from 'react';
import { classNames } from 'utils/classNames';

function TextInput(props) {
	const { error, type, ...rest } = props;
	const className = classNames({
		'form-control': true,
		'error': error
	});

	return (
		<div className={className}>
			<input {...rest} type={type || 'text'} />
			{ error ? <p>{error}</p> : null }
		</div>

	);
}

TextInput.propTypes = {
	type: PropTypes.oneOf(['text', 'password', 'number'])
};

export default TextInput;
