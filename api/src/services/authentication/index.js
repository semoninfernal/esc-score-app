import authentication from 'feathers-authentication';
import AuthService from './auth-service';
import { before, after } from './hooks';


export default function () {
	const app = this;
	let config = {
		...app.get('auth'),
		idField: 'id',
		usernameField: 'username'
	};

	app.set('auth', config);
	app.configure(authentication(config));

	app.use('/auth/load', new AuthService());
	const authService = app.service('/auth/load');

	authService.before(before);
	authService.after(after);
}
