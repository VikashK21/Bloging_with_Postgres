/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('blogging', tb => {
            tb.increments();
            tb.integer('user_id').notNullable();
            tb.string('post_titles').notNullable();
            tb.string('posts').notNullable();
            tb.integer('likes').notNullable();
            tb.integer('dislikes').notNullable();
            tb.json('reactors_id')
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('blogging')
};
