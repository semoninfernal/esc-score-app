import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

// Create a hook that converts between snake_case and camelCase deep

// Do formatting in after-hook, remove timestamps and do the case thing

const formatEvent = ({id, name, active, owner}) => ({
  id,
  name,
  active,
  owner
});

export default class EventService extends Service {
  _find(params) {
    let query = this.db().select('events.id', 'events.name', 'events.active', 'event_members.owner');
    if (params.query.id) {
      query = query.where({['events.id']: params.query.id})
    }

    return query
      .innerJoin('event_members', 'events.id', 'event_members.event_id')
      .where({['event_members.user_id']: params.user.id})
      .then(events => {
        return events.map(formatEvent);
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
        throw new errors.NotFound(`No event found for id ${id}`)
      }
      return result[0];
    }).catch(errorHandler)
  }

  _create(data, params) {
    return this.db()
      .insert(data, 'id')
      .tap(rows => {
        // Add current user as owner of event
        return this.knex.insert({
          user_id: params.user.id,
          event_id: rows[0],
          owner: true
        }).into('event_members');
      })
      .then(rows => {
        return this._get(rows[0], params)
          .then(formatEvent);
      })
      .catch(errorHandler);
  }

  // TODO Add a token to this that allows you to create an event, this is to prevent spamming of events
  // Validate in before hook
  create(data, params) {
    return this._create(data, params);
  }

  patch(id, data, params) {
    // Only allow active to be patched
    data = {
      active: !!data.active
    }
    return this.db()
      .where({id})
      .update(data, 'id')
      .then(id => {
        return this._get(id[0], params)
      });
  }

  update() {
    throw new errors.MethodNotAllowed('Updating events is not yet supported');
  }
}
