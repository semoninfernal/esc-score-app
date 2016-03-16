
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('user_name').unique();
    table.string('password');
    table.timestamps();
  }).createTable('roles', function(table) {
    table.increments('id').primary();
    table.string('name').unique();
  }).createTable('users_roles', function(table) {
    table.integer('user_id').references('users.id');
    table.integer('role_id').references('roles.id');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users')
    .dropTable('roles')
    .dropTable('users_roles');
};
