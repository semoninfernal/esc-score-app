import user from './user';
import authentication from './authentication';
import knex from 'knex';

export default function() {
  const app = this;

  const db = knex({
    client: 'pg',
    connection: app.get('postgres'),
    searchPath: 'knex,public'
  });

  app.set('knex', db);

  app.configure(authentication);
  app.configure(user);
};
