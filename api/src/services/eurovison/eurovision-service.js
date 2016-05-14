import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

const scoreTypes = [
	'Låt',
	'Framförande',
	'Show'
];

const eventItems = [
	{
		name: `What's the pressure`,
		description: `Belgien`
	},
	{
		name: `I stand`,
		description: `Tjeckien`
	},
	{
		name: `Slow down`,
		description: `Nederländerna`
	},
	{
		name: `Miracle`,
		description: `Azerbajdzjan`
	},
	{
		name: `Pioneer`,
		description: `Ungern`
	},
	{
		name: `No degree of separation`,
		description: `Italien`
	},
	{
		name: `Made of stars`,
		description: `Israel`
	},
	{
		name: `If love was a crime`,
		description: `Bulgarien`
	},
	{
		name: `If I were sorry`,
		description: `Sverige`
	},
	{
		name: `Ghost`,
		description: `Tyskland`
	},
	{
		name: `J'ai cherché`,
		description: `Frankrike`
	},
	{
		name: `Color of your life`,
		description: `Polen`
	},
	{
		name: `Sound of silence`,
		description: `Australien`
	},
	{
		name: `Alter ego`,
		description: `Cypern`
	},
	{
		name: `Goodbye (shelter)`,
		description: `Serbien`
	},
	{
		name: `I've been waiting for this night`,
		description: `Litauien`
	},
	{
		name: `Lighthouse`,
		description: `Kroatien`
	},
	{
		name: `You are the only one`,
		description: `Ryssland`
	},
	{
		name: `Say yay!`,
		description: `Spanien`
	},
	{
		name: `Heartbeat`,
		description: `Lettland`
	},
	{
		name: `1944`,
		description: `Ukraina`
	},
	{
		name: `Walk on water`,
		description: `Malta`
	},
	{
		name: `Midnight gold`,
		description: `Georgien`
	},
	{
		name: `Loin d'ici`,
		description: `Österrike`
	},
	{
		name: `You are not alone`,
		description: `Storbrittannien`
	},
	{
		name: `Lovewave`,
		description: `Armenien`
	},
]

export default class EurovisonService extends Service {
	find(params) {
		throw new errors.MethodNotAllowed('Not supported');
	}

	get() {
		throw new errors.MethodNotAllowed('Not supported');
	}

	_createEvent(data) {
		return this.knex('events')
			.insert({
				name: 'Eurovison 2016',
				active: true
			}, 'id')
			.tap(rows => {
				// Add current user as owner of event
				return this.knex.insert({
					user_id: data.user,
					event_id: rows[0],
					owner: true
				}).into('event_members');
			})
			.then(rows => {
				return rows[0]
			});
	}

	_createEventScoreTypes(event) {
		var base = {event_id: event, min: 0, max: 10};
		function createScoreType(item) {
			return {
				...base,
				name: item
			}
		};

		return this.knex('event_score_types')
			.insert(scoreTypes.map(createScoreType), 'id')
			.then(rows => {
				return `${rows.length} score types created`;
			})
	}

	_createEventItems(event) {
		function createItem(item, index) {
			return {
				...item,
				event_id: event,
				sort_index: index + 1
			};
		}

		return this.knex('event_items')
			.insert(eventItems.map(createItem), 'id')
			.then(rows => {
				return `${rows.length} items created`;
			})
	}

	create(data, params) {
		this._createEvent(data)
			.then(eventId => {
				return Promise.all([
					this._createEventScoreTypes(eventId),
					this._createEventItems(eventId)
				]);
			})
			.then(res => {
				console.log('RESULT', res)
				return res;
			})
			.catch(errorHandler);
	}

	patch(id, data, params) {
		throw new errors.MethodNotAllowed('Not supported');
	}

	update() {
		throw new errors.MethodNotAllowed('Not supported');
	}
}
