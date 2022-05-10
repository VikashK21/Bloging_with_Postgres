/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users.string('name').notNullable();
            users.string('email').notNullable();
            users.string('password').notNullable();
            users.timestamp('created_at').defaultTo(knex.fn.now());
            users.timestamp('updated_at').defaultTo(knex.fn.now());
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');

};
