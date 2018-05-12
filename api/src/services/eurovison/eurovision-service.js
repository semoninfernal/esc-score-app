import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

const eventItems = [
	{
		description: "Under the Ladder",
		name: "Ukraina"
	},
	{
		description: "Tu canción",
		name: "Spanien"
	},
	{
		description: "Hvala, ne!",
		name: "Slovenien"
	},
	{
		description: "When We're Old",
		name: "Litauen"
	},
	{
		description: "Nobody but You",
		name: "Österrike"
	},
	{
		description: "La forza",
		name: "Estland"
	},
	{
		description: "That's How You Write a Song",
		name: "Norge"
	},
	{
		description: "O jardim",
		name: "Portugal"
	},
	{
		description: "Storm",
		name: "Storbritannien"
	},
	{
		description: "Serbien",
		name: "Nova deca"
	},
	{
		description: "You Let Me Walk Alone",
		name: "Tyskland"
	},
	{
		description: "Mall",
		name: "Albanien"
	},
	{
		description: "Mercy",
		name: "Frankrike"
	},
	{
		description: "Lie to Me",
		name: "Tjeckien"
	},
	{
		description: "Higher Ground",
		name: "Danmark"
	},
	{
		description: "We Got Love",
		name: "Australien"
	},
	{
		description: "Monsters",
		name: "Finland"
	},
	{
		description: "Bones",
		name: "Bulgarien"
	},
	{
		description: "My Lucky Day",
		name: "Moldavien"
	},
	{
		description: "Dance You Off",
		name: "Sverige"
	},
	{
		description: "Viszlát nyár",
		name: "Ungern"
	},
	{
		description: "Toy",
		name: "Israel"
	},
	{
		description: "Outlaw in 'Em",
		name: "Nederländerna"
	},
	{
		description: "Together",
		name: "Irland"
	},
	{
		description: "Fuego",
		name: "Cypern"
	},
	{
		description: "Non mi avete fatto niente",
		name: "Italien"
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
