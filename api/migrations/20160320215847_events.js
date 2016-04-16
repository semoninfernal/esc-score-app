
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.boolean('active').defaultTo(false);
    }).createTable('event_members', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('users.id').onDelete('CASCADE');
      table.integer('event_id').references('events.id').onDelete('CASCADE');
      table.boolean('owner').defaultTo(false);
    }).createTable('event_score_types', function(table) {
      table.increments('id').primary();
      table.integer('event_id').references('events.id').onDelete('CASCADE');
      table.string('name').unique();
      table.integer('min');
      table.integer('max');
  }).then(() => {
    return knex.schema.raw(`
    ALTER TABLE event_members
    ADD CONSTRAINT event_members_user_id_event_id UNIQUE (user_id, event_id)
  `);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.raw('DROP TABLE "events" CASCADE')
    .raw('DROP TABLE "event_members" CASCADE')
    .raw('DROP TABLE "event_score_types" CASCADE');
};
