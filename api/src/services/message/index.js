import service from 'feathers-knex';
// We can get a class to extend by importing { Service } from feathers-knex
// us it by registering the service with app.use('/service', new MyService(options));

module.exports = function message() {
  const app = this;

  const db = app.get('knex')

  const options = {
    Model: db,
    name: 'messages',
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('/messages', service(options));

  // Add hooks here
};
