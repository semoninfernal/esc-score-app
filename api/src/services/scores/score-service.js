import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class ScoreTypeService extends Service {
  _find(params) {
    let query = this.db().select('*');
    console.log(params);
    if (params.query.id) {
      query = query.where({id: params.query.id})
    }

    return this.db()
      .select('*')
      .where({event_member_id: params.member.id, event_item_id: params.item.id}).then(scoreTypes => {
        return scoreTypes
      }).catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  _get(id, params = {}) {
    params.query = params.query || {};
    params.query.id = id;

    return this._find(params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No score found for id ${id}`)
      }
      return result[0];
    }).catch(errorHandler)
  }

  create(data, params) {
    return this.db()
      .insert({
        ...data,
        event_item_id: params.item.id,
        event_member_id: params.member.id
      }, 'id')
      .then(rows => {
        console.log(rows);
        return this._get(rows[0], params);
      });
  }

  patch(id, data, params) {
    return this.db()
      .where({id})
      .update(data, 'id')
      .then(rows => {
        return this._get(rows[0], params);
      });
  }

  update() {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }
}
