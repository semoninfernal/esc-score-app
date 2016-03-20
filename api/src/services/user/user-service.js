import { Service } from 'feathers-knex';
//import errorHandler from 'feathers-knex/errorHandler';
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
      .catch(err => { throw err });
  }
}
