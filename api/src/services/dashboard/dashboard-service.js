import { Service } from 'feathers-knex';
import { groupBy } from 'lodash';
import errors from 'feathers-errors';
import errorHandler from '../errors';

function formatDashboard(result) {
  const groupedItems = groupBy(result, 'item_id');
  return {
    id: result[0].id,
    name: result[0].name,
    items: Object.keys(groupedItems).map(itemId => {
      const items = groupedItems[itemId];
		console.log(items);
      return {
        id: items[0].item_id,
        name: items[0].item_name,
        desciption: items[0].item_description,
        scores: items.filter(item => item.score_id !== null).map(score => ({
          id: score.score_id,
          score_type: score.score_type_id,
          member: score.event_member_id,
          value: score.score
        }))
      }
    })
  };
}

export default class EventService extends Service {
  _find(params) {
    return this.db()
      .select(
        'events.id',
        'events.name',
        'event_items.id as item_id',
        'event_items.name as item_name',
        'event_items.description as item_description',
        'event_scores.id as score_id',
        'event_scores.event_member_id',
        'event_scores.value as score',
        'event_scores.score_type_id'
      )
      .where({'events.id': params.eventId})
      .innerJoin('event_items', 'event_items.event_id', 'events.id')
      .leftJoin('event_scores', 'event_items.id', 'event_scores.event_item_id')
      .then(formatDashboard)
      .catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  get(id, params) {
    throw new errors.MethodNotAllowed('Getting a single dashboard is not supported');
  }

  create(data, params) {
    throw new errors.MethodNotAllowed('Creating dashboard is not supported');
  }

  patch(id, data, params) {
    throw new errors.MethodNotAllowed('Patching dashboard is not supported');
  }

  update() {
    throw new errors.MethodNotAllowed('Updating dashboard is not supported');
  }
}
