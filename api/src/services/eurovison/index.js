import service from 'feathers-knex';
import EurovisonService from './eurovision-service';
import { before, after } from './hooks';
import { eurovision } from '../names';

export default function() {
	const app = this;

	const options = {
		Model: app.get('knex'),
		name: 'events'
	};

	app.use(eurovision, new EurovisonService(options));

	const eurovisionService = app.service(eurovision);

	eurovisionService.before(before);
	eurovisionService.after(after);
};
