import React from 'react';
import { reduxForm } from 'redux-form';
import { TextInput } from 'components/shared/form';
import Button from 'components/shared/Button';

const { func } = React.PropTypes;

const fields = ['username', 'password'];
const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = 'You have to enter a username';
	}
	if (!values.password) {
		errors.password = 'You have to enter a password';
	}

	return errors;
};

function LoginForm(props) {
	const { fields: { username, password }, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<TextInput placeholder='username' {...username} />
			<TextInput placeholder='password' type='password' {...password} />
			<Button cta type='submit'>Log in</Button>
		</form>
	);
}

LoginForm.propTypes = {
	handleSubmit: func.isRequired
};

export default reduxForm({
	form: 'loginForm',
	fields,
	validate
})(LoginForm);
