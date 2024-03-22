/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("podstack", (table) => {
        table.increments('id').primary();
        table.string("channel").notNullable();
        table.string("channelViewCount").notNullable();
        table.string("subscriberCount").notNullable();
        table.string("country").notNullable();
       
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("podstack")
  
};
