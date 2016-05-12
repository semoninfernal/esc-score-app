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
		errors.username = 'Du måste ange ett användarnamn';
	}
	if (!values.password) {
		errors.password = 'Du måste ange ett lösenord';
	}
	if (!values.repeatPassword) {
		errors.repeatPassword = 'Du måste repetera ditt lösenord';
	}
	if (values.password !== values.repeatPassword) {
		errors.repeatPassword = 'Lösenorden matchar inte';
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
			<TextInput placeholder='användarnamn' {...username} />
			<TextInput placeholder='lösenord' type='password' {...password} />
			<TextInput placeholder='uppreda lösenord' type='password' {...repeatPassword} />
			<Button cta type='submit'>Registrera</Button>
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
