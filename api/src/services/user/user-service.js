import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';

export default class UserService extends Service {
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
