const knex = require("./connection");

module.exports = {
  getOne: function(id) {
    return knex("users")
      .where("id", id)
      .first();
  },
  getFirst: function() {
    return knex("users").first();
  },
  insertUser: function(user) {
    const { username, password, admin = false } = user;
    console.log("in query", username, password);
    return knex("users")
      .insert({
        username,
        password,
        admin
      })
      .returning("*");
  }
};
