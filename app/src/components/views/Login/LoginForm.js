import React from 'react';
import { reduxForm } from 'redux-form';
import { push as _push } from 'react-router-redux';
import { Link } from 'react-router';
import { submitHandler } from 'utils/form';
import { create } from 'redux/modules/auth';
import { TextInput } from 'components/shared/form';
import Button from 'components/shared/Button';
import MessageBox from 'components/shared/MessageBox';

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

function LoginForm(props) {
	const { fields: { username, password }, error, returnUrl, handleSubmit, push } = props;
	return (
		<div>
			<form onSubmit={handleSubmit(submitHandler(create, () => push(returnUrl || '/')))}>
				{error ? (<MessageBox error message={error} />) : null}
				<TextInput placeholder='användarnamn' {...username} />
				<TextInput placeholder='lösenord' type='password' {...password} />
				<Button cta type='submit'>Logga in</Button>
			</form>
			<p className='register-link'>Registrera dig <Link to='/register'>här</Link></p>
		</div>
	);
}

export default reduxForm({
	form: 'loginForm',
	fields,
	validate
}, null, { push: _push })(LoginForm);
