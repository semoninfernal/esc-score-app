import _bookshelf from 'bookshelf';
import _knex from 'knex';

const configName = process.env.NODE_ENV === 'production' ? 'production' : 'default';
const config = require(`../../config/${configName}`);

const knex = _knex({
  client: 'pg',
  connection: config.postgres,
  searchPath: 'knex,public'
});

const bookshelf = _bookshelf(knex);
bookshelf.plugin('registry');

export default bookshelf;
