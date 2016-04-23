import React from 'react';
import { reduxForm } from 'redux-form';
import { submitHandler } from 'utils/form';
import { register } from 'redux/modules/gui/register';
import { TextInput } from 'components/shared/form';
import Button from 'components/shared/Button';

const { object } = React.PropTypes;

const fields = ['username', 'password', 'repeatPassword'];
const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = 'You have to enter a username';
	}
	if (!values.password) {
		errors.password = 'You have to enter a password';
	}
	if (!values.repeatPassword) {
		errors.repeatPassword = 'You have to repeat your password';
	}
	if (values.password !== values.repeatPassword) {
		errors.repeatPassword = 'Password does not match';
	}

	return errors;
};

const selector = state => ({
	gui: state.gui.register
});

function RegisterForm(props) {
	const { fields: { username, password, repeatPassword }, handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit(submitHandler(register))}>
			<TextInput placeholder='username' {...username} />
			<TextInput placeholder='password' type='password' {...password} />
			<TextInput placeholder='repeat password' type='password' {...repeatPassword} />
			<Button cta type='submit'>Register</Button>
		</form>
	);
}

RegisterForm.propTypes = {
	gui: object
};

export default reduxForm({
	form: 'loginForm',
	fields,
	validate
}, selector)(RegisterForm);
