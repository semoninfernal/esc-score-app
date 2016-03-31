import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class MemberService extends Service {
  _find(params) {
    let query = this.db().select('users.id', 'users.username', 'event_members.owner');

    if (params.query.id) {
      query = query.where({['event_members.user_id']: params.query.id})
    }

    return query
      .innerJoin('users', 'event_members.user_id', 'users.id')
      .where({['event_members.event_id']: params.eventId}).then(members => {
        return members
      }).catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  _get(id, params) {
    params.query = params.query || {};
    params.query.id = id;

    return this._find(params)
      .then(result => {
        if (!result.length) {
          throw new errors.NotFound(`No member found for id ${id}`)
        }
        return result[0];
      }).catch(error => {
        console.log('catch error in get member');
        errorHandler(error);
      })
  }

  get(id, params = {}) {
    return this._get(id, params);
  }

  create(data, params) {
    const d = {
      user_id: data.user,
      event_id: params.eventId
    };

    // Check if user exists in hooks
    return this.db()
      .insert(d)
      .then(() => {
        return this._get(d.user_id, params)
          .then(member => member)
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
    throw new errors.MethodNotAllowed('Updating members is not supported');
  }

  update() {
    throw new errors.MethodNotAllowed('Updating members is not suported');
  }
}
