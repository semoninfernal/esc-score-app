
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex.table('roles').insert({name: 'user'}, 'id')
  );
};
