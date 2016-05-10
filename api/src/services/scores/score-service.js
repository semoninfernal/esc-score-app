import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import { assignId } from '../../utils/params';
import errorHandler from '../errors';

export default class ScoreTypeService extends Service {
  _find(params) {
    let query = this.db().select(
		'event_scores.id',
		'event_scores.event_member_id',
		'event_scores.score_type_id',
		'event_scores.event_item_id',
		'event_scores.value',
		'event_items.event_id'
	);

    if (params.query.id) {
      query = query.where({id: params.query.id})
    }

    return query
	  .leftJoin('event_items', 'event_scores.event_item_id', 'event_items.id')
      .where({
        event_member_id: params.member.id,
        event_item_id: params.item.id})
      .then(scoreTypes => {
        return scoreTypes
      }).catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  _get(id, params = {}) {
    const _params = assignId(id, params);

    return this._find(_params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No score found for id ${id}`)
      }
      return result[0];
    }).catch(errorHandler)
  }

  get(id, params) {
    return this._get(id, params);
  }

  // TODO This needs to support several rows
  create(data, params) {
    return this.db()
      .insert({
        ...data,
        event_item_id: params.item.id,
        event_member_id: params.member.id
      }, 'id')
      .then(rows => {
        return this._get(rows[0], params);
      })
      .catch(errorHandler);
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
