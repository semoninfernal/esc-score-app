'use strict';

const service = require('feathers-knex');
const user = require('./user-model');
import { before, after } from './hooks/index';
import userModel from './user-model';

module.exports = function(){
  const app = this;

  const bookshelf = app.get('bookshelf');
  userModel(bookshelf);

  const options = {
    Model: bookshelf.knex,
    name: 'users',
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(before);

  // Set up our after hooks
  userService.after(after);
};
