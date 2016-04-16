import knex from 'knex';
import user from './user';
import event from './event';
import scores from './scores';
import scoreType from './scoreType';
import member from './member';
import item from './item';
import dashboard from './dashboard';
import authentication from './authentication';

export default function() {
  const app = this;

  const db = knex({
    client: 'pg',
    connection: app.get('postgres'),
    searchPath: 'knex,public',
    debug: true
  });

  app.set('knex', db);

  app.configure(authentication);
  app.configure(user);
  app.configure(event);
  app.configure(scoreType);
  app.configure(member);
  app.configure(item);
  app.configure(scores);
  app.configure(dashboard);
};
