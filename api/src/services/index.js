const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');
const knex = require('knex');

module.exports = function() {
  const app = this;

  const db = knex({
    client: 'pg',
    connection: app.get('postgres'),
    searchPath: 'knex,public'
  });

  app.set('knex', db);

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(message);
};
