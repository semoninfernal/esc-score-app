import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import { assignId } from '../../utils/params';
import errorHandler from '../errors';

export default class ItemService extends Service {
  _find(params) {

    /*
     event_items.name,
     event_items.description,
     event_items.sort_index,
     event_items.image,

     */

    let query = this.knex.raw(`
      SELECT
        event_items.id,
        sum(scores.value) AS score
      FROM event_items
      FULL OUTER JOIN (
        SELECT value, id, event_item_id FROM event_scores WHERE event_scores.event_member_id = ${params.member.id}
      ) scores
        ON scores.event_item_id = event_items.id
      ${params.query.id ? 'WHERE event_items.id = ' + params.query.id : ''}
      GROUP BY event_items.id
      ORDER BY event_items.id
    `);

    /*
     *
      * WHERE event_scores.event_member_id = ${params.member.id}
     ${params.query.id ? 'AND event_items.id = ' + params.query.id : ''}*/

    return query
      .then(result => {
        return result.rows
      }).catch(errorHandler);
  }

  find(params) {
    return this._find(params);
  }

  _get(id, params) {
    const _params = assignId(id, params);

    return this._find(_params).then(result => {
      if (!result.length) {
        throw new errors.NotFound(`No item found for id ${params.query.id}`)
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
