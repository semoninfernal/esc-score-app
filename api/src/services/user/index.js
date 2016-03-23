import service from 'feathers-knex';
import bookshelf from '../../bookshelf'
import UserService from './user-service';
import { before, after } from './hooks';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'users',
    paginate: {
      default: false,
      max: 25
    }
  };

  app.use('/users', new UserService(options));

  const userService = app.service('/users');

  userService.before(before);
  userService.after(after);
};
