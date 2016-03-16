const authentication = require('./authentication');
const user = require('./user');

const _knex = require('knex');
const _bookshelf = require('bookshelf');

module.exports = function() {
  const app = this;

  const knex = _knex({
    client: 'pg',
    connection: app.get('postgres'),
    searchPath: 'knex,public'
  });

  const bookshelf = _bookshelf(knex);
  bookshelf.plugin('registry');

  app.set('bookshelf', bookshelf);

  app.configure(authentication);
  app.configure(user);
};
