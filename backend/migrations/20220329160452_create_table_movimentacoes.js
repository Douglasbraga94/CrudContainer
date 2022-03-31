/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('movimentacoes', table => {
        table.increments('id').primary;
        table.integer('idTipo', 20).references('id').inTable('tipos').notNullable();
        table.dateTime('dataHoraInicio').notNullable();
        table.dateTime('dataHoraFim').notNullable();
        table.integer('idContainer').references('id').inTable('containers')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('movimentacoes')
};
