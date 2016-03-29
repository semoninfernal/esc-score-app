import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class ItemService extends Service {
  find(params) {
    let query = this.db().select('*');

    if (params.query.id) {
      query = query.where({id: params.query.id})
    }

    return this.db()
      .select('id', 'event_id', 'name', 'description', 'image', 'sort_index')
      .where({event_id: params.eventId})
      .then(items => {
        return items
      }).catch(errorHandler);
  }

  get(id, params = {}) {
    params.query = params.query || {};
    params.query.id = id;

    return this.find(_params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No member found for id ${id}`)
      }
      return result[0];
    }).catch(errorHandler)
  }

  create(data, params) {
    const d = {
      ...data,
      event_id: params.eventId
    };

    return this.db()
      .insert(d, 'id')
      .then(rows => {
        return this.get(rows[0], params)
          .then(item => item)
      }).catch(errorHandler);
  }

  remove(id, params) {
    const item = this.get(id, params);

    return this.db()
      .where({event_id: params.eventId, user_id: id})
      .del().then(() => {
        return item;
      }).catch(errorHandler);
  }

  patch(id, data, params) {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }

  update() {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }
}
