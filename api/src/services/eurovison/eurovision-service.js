import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

const eventItems = [
	{
		name: "Under the Ladder",
		description: "Ukraina"
	},
	{
		name: "Tu canción",
		description: "Spanien"
	},
	{
		name: "Hvala, ne!",
		description: "Slovenien"
	},
	{
		name: "When We're Old",
		description: "Litauen"
	},
	{
		name: "Nobody but You",
		description: "Österrike"
	},
	{
		name: "La forza",
		description: "Estland"
	},
	{
		name: "That's How You Write a Song",
		description: "Norge"
	},
	{
		name: "O jardim",
		description: "Portugal"
	},
	{
		name: "Storm",
		description: "Storbritannien"
	},
	{
		name: "Serbien",
		description: "Nova deca"
	},
	{
		name: "You Let Me Walk Alone",
		description: "Tyskland"
	},
	{
		name: "Mall",
		description: "Albanien"
	},
	{
		name: "Mercy",
		description: "Frankrike"
	},
	{
		name: "Lie to Me",
		description: "Tjeckien"
	},
	{
		name: "Higher Ground",
		description: "Danmark"
	},
	{
		name: "We Got Love",
		description: "Australien"
	},
	{
		name: "Monsters",
		description: "Finland"
	},
	{
		name: "Bones",
		description: "Bulgarien"
	},
	{
		name: "My Lucky Day",
		description: "Moldavien"
	},
	{
		name: "Dance You Off",
		description: "Sverige"
	},
	{
		name: "Viszlát nyár",
		description: "Ungern"
	},
	{
		name: "Toy",
		description: "Israel"
	},
	{
		name: "Outlaw in 'Em",
		description: "Nederländerna"
	},
	{
		name: "Together",
		description: "Irland"
	},
	{
		name: "Fuego",
		description: "Cypern"
	},
	{
		name: "Non mi avete fatto niente",
		description: "Italien"
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
