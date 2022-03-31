/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('containers', table => {
      table.increments('id').primary;
      table.string('cliente').notNullable();
      table.string('container', 10).notNullable();
      table.integer('tipo').notNullable();
      table.boolean('status').notNullable();
      table.string('categoria', 15).notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('containers')
};
