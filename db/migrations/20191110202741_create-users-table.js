exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("password").notNullable();
    table.string("country").notNullable();
    table.integer("tier").notNullable();
    table
      .boolean("admin")
      .notNullable()
      .defaultTo(false);
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));

    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = function(knex) {
  exports.down = (knex, Promise) => {
    return knex.schema.dropTable("users");
  };
};
