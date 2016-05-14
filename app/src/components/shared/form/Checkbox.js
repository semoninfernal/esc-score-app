import React from 'react';

require('./checkbox.scss');

const { string, func } = React.PropTypes;

function Checkbox(props) {
	const { id, label, onChange, checked } = props;

	return (
		<div className='checkbox'>
			<input checked={checked} id={id} type='checkbox' onChange={onChange} />
			<label htmlFor={id}><span className='label'>{label}</span><span className='checkbox-box' /></label>
		</div>
	);
}

Checkbox.propTypes = {
	id: string.isRequired,
	label: string,
	onChange: func.isRequired
};

export default Checkbox;
