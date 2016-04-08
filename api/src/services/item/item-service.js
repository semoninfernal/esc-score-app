import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import { assignId } from '../../utils/params';
import errorHandler from '../errors';

export default class ItemService extends Service {
  _find(params) {
    let query = this.db().select(
      'event_items.id',
      'event_items.event_id',
      'event_items.name',
      'event_items.description',
      'event_items.image',
      'event_items.sort_index',
      'event_scores.value'
    );

    if (params.query.id) {
      query = query.where({['event_items.id']: params.query.id})
    }

    return query
      //.select('id', 'event_id', 'name', 'description', 'image', 'sort_index')
      .innerJoin('event_scores', 'event_items.id', 'event_scores.event_item_id')
      .where({['event_items.event_id']: params.eventId})
      .then(items => {
        return items
      }).catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  _get(id, params) {
    const _params = assignId(id, params);

    return this._find(_params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No member found for id ${params.query.id}`)
      }
      return result[0];
    }).catch(errorHandler)
  }

  create(data, params) {
    return this.db()
      .insert(data, 'id')
      .then(rows => {
        return this._get(rows[0], params)
          .then(item => item)
      }).catch(errorHandler);
  }

  remove(id, params) {
    const item = this._get(id, params);

    return this.db()
      .where({event_id: params.eventId, user_id: id})
      .del().then(() => {
        return item;
      }).catch(errorHandler);
  }

  patch(id, data, params) {

    return this.db()
      .where({id})
      .update(data, 'id')
      .then(rows => {
        return this._get(rows[0], params)
          .then(item => item);
      }).catch(errorHandler);
  }

  update() {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }
}
