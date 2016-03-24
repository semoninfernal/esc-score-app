import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class EventService extends Service {
  find(params) {
    let query = this.db().select('*');

    if (params.query.id) {
      query = query.where({['id']: params.query.id})
    }

    return this.db()
      .select('*')
      .where({event_id: params.eventId}).then(scoreTypes => {
        return scoreTypes
      }).catch(errorHandler);
  }

  get(id, params = {}) {
    params.query = params.query || {};
    params.query.id = id;

    return this.find(params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No event found for id ${id}`)
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
        return this.db().select('*').where({id: rows[0]}).then(scoreType => {
          return scoreType;
        });
      });
  }

  patch(id, data, params) {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }

  update() {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }
}
