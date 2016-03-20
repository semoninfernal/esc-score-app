import { Service } from 'feathers-knex';
import errors from 'feathers-errors';
import errorHandler from '../errors';
import RoleModel from './role-model';
import User from './user-model';

export default class UserService extends Service {
  create(data, params) {
    return new User(data).save()
      .then(user => {
        user.roles().attach(1);
        return user.fetch({
          withRelated: 'roles'
        });
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
