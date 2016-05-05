import React from 'react';

const { number } = React.PropTypes;

function RangeInput(props) {
	return (
		<input type='range' {...props} />
	);
}

RangeInput.propTypes = {
	min: number.isRequired,
	max: number.isRequired
};

export default RangeInput;
