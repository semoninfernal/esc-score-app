import React from 'react';
import { reduxForm } from 'redux-form';
import { push as _push } from 'react-router-redux';
import { submitHandler } from 'utils/form';
import { create } from 'redux/modules/auth';
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
	const { fields: { username, password }, gui: { error }, returnUrl, handleSubmit, push } = props;
	return (
		<form onSubmit={handleSubmit(submitHandler(create, () => push(returnUrl || '/')))}>
			{error ? (<p className='st-error'>{error.message}</p>) : null}
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
}, selector, { push: _push })(LoginForm);
