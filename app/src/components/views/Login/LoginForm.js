import React from 'react';
import { reduxForm } from 'redux-form';
import { push as _push } from 'react-router-redux';
import { Link } from 'react-router';
import { submitHandler } from 'utils/form';
import { create } from 'redux/modules/auth';
import { TextInput } from 'components/shared/form';
import Button from 'components/shared/Button';

const { object } = React.PropTypes;

const fields = ['username', 'password'];
const validate = values => {
	const errors = {};
	if (!values.username) {
		errors.username = 'Du måste ange ett användarnamn';
	}
	if (!values.password) {
		errors.password = 'Du måste ange ett lösenord';
	}

	return errors;
};

const selector = state => ({
	gui: state.gui.login
});

function LoginForm(props) {
	const { fields: { username, password }, gui: { error }, returnUrl, handleSubmit, push } = props;
	return (
		<div>
			<form onSubmit={handleSubmit(submitHandler(create, () => push(returnUrl || '/')))}>
				{error ? (<p className='st-error'>{error.message}</p>) : null}
				<TextInput placeholder='användarnamn' {...username} />
				<TextInput placeholder='lösenord' type='password' {...password} />
				<Button cta type='submit'>Logga in</Button>
			</form>
			<p className='register-link'>Registrera dig <Link to='/register'>här</Link></p>
		</div>
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
