import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class UserService extends Service {
  /* _find(params) {
    let query = this.db().select('id', 'username', 'password');

    if (params.query.id) {
      query = query.where({id: params.query.id})
    }

    return query.then(users => {
        return users
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
        if (!result || result.length === 0) {
          throw new errors.NotFound(`No user found with id ${id}`)
        }
        return result[0];
      }).catch(errorHandler);
  }

  get(id, params) {
    return this._get(id, params);
  }

  get(id, params) {
    console.log('GET');

    return super.get(id, params);
  } */

  create(data, params) {
    return this.db()
      .insert(data, 'id')
      .then(rows => {
        return this._get(rows[0], params)
      })
      .catch(errorHandler);
  }

  remove() {
    throw new errors.MethodNotAllowed('Deleting users is not yet supported');
  }

  patch() {
    throw new errors.MethodNotAllowed('Patching users is not yet supported');
  }

  update() {
    throw new errors.MethodNotAllowed('Updating users is not yet supported');
  }
}
