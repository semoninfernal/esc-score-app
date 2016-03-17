import user from './user';
import authentication from './authentication';
import _knex from 'knex';
import _bookshelf from 'bookshelf';

export default function() {
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
