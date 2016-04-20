import React from 'react';
import { reduxForm } from 'redux-form';
import { login } from 'redux/modules/gui/login';
import { TextInput } from 'components/shared/form';
import Button from 'components/shared/Button';

const { object } = React.PropTypes;

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

const selector = state => ({
	gui: state.gui.login
});

function LoginForm(props) {
	const { fields: { username, password }, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit(login)}>
			<TextInput placeholder='username' {...username} />
			<TextInput placeholder='password' type='password' {...password} />
			<Button cta type='submit'>Log in</Button>
		</form>
	);
}

LoginForm.propTypes = {
	gui: object
};

export default reduxForm({
	form: 'loginForm',
	fields,
	validate
}, selector)(LoginForm);
