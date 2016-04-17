import React from 'react';
import { Link } from 'react-router';
import { classNames } from '../../utils/classNames';

const propTypes = React.PropTypes;

require('./styles/button.scss');

function Button(props) {
	const { children, ...rest } = props;
	const _className = classNames({
		'btn': true,
		'btn-cta': props.cta
	}, props);

	return props.type ?
		<input {...rest} className={_className} value={children} /> :
		<Link {...rest} className={_className}>{children}</Link>;
}

Button.propTypes = {
	children: propTypes.string.isRequired,
	cta: propTypes.bool,
	type: propTypes.oneOf(['button', 'submit'])
};

export default Button;
