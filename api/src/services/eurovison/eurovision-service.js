import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

const eventItems = [
	{
		name: "I Feel Alive",
		description: "Israel"
	},
	{
		name: "Flashlight",
		description: "Polen"
	},
	{
		name: "Story of My Life",
		description: "Vitryssland"
	},
	{
		name: "Running On Air",
		description: "Österrike"
	},
	{
		name: "Fly With Me",
		description: "Armenien"
	},
	{
		name: "Lights and Shadows",
		description: "Nederländerna"
	},
	{
		name: "Hey Mamma",
		description: "Moldavien"
	},
	{
		name: "Origo",
		description: "Ungern"
	},
	{
		name: "Occidentali's Karma",
		description: "Italien"
	},
	{
		name: "Where I Am",
		description: "Danmark"
	},
	{
		name: "Amar pelos dois",
		description: "Portugal"
	},
	{
		name: "Skeletons",
		description: "Azerbajdzjan"
	},
	{
		name: "My Friend",
		description: "Kroatien"
	},
	{
		name: "Don't Come Easy",
		description: "Australien"
	},
	{
		name: "This Is Love",
		description: "Grekland"
	},
	{
		name: "Do It For Your Lover",
		description: "Spanien"
	},
	{
		name: "Grab The Moment",
		description: "Norge"
	},
	{
		name: "Never Give Up on You",
		description: "Storbritannien"
	},
	{
		name: "Gravity",
		description: "Cypern"
	},
	{
		name: "Yodel It!",
		description: "Rumänien"
	},
	{
		name: "Perfect Life",
		description: "Tyskland"
	},
	{
		name: "Time",
		description: "Ukraina"
	},
	{
		name: "City Lights",
		description: "Belgien"
	},
	{
		name: "I Can’t Go On",
		description: "Sverige"
	},
	{
		name: "Beautiful Mess",
		description: "Bulgarien"
	},
	{
		name: "Requiem",
		description: "Frankrike"
	}
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
				name: 'Eurovison 2017',
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

	_createEventScoreTypes(event, scoreTypes) {
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
					this._createEventScoreTypes(eventId, data.scoreTypes),
					this._createEventItems(eventId)
				]);
			})
			.then(res => {
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
