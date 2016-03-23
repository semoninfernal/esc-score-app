import user from './user';
import event from './event';
import authentication from './authentication';
import bookshelf from '../bookshelf';
import knex from 'knex';

export default function() {
  const app = this;

  /* const db = knex({
    client: 'pg',
    connection: app.get('postgres'),
    searchPath: 'knex,public'
  }); */

  app.set('knex', bookshelf.knex);

  app.configure(authentication);
  app.configure(user);
  app.configure(event);
};
