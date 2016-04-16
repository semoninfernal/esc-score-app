
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_scores', function(table) {
    table.increments('id').primary();
    table.integer('event_member_id').references('event_members.id').onDelete('CASCADE');
    table.integer('score_type_id').references('event_score_types.id').onDelete('CASCADE');
    table.integer('event_item_id').references('event_items.id').onDelete('CASCADE');
    table.integer('value');
  }).then(() => {
    return knex.schema.raw(`
    ALTER TABLE event_scores
    ADD CONSTRAINT event_scores_event_member_id_score_type_id_event_item_id UNIQUE (event_member_id, score_type_id, event_item_id)
  `);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_scores');
};
