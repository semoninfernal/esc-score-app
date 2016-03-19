import { Service } from 'feathers-knex';
//import errorHandler from 'feathers-knex/errorHandler';
import RoleModel from './role-model';
import User from './user-model';

export default class UserService extends Service {
  create(data, params) {
    var role = data.role;
    delete data.role;

    return new User({
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    }).save()
      .then(user => user.roles().attach(role))
      .then(() => new User({user_name: data.user_name}))
      .catch(err => { throw err });
  }
}
