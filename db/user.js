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
    const {
      email,
      password,
      admin = false,
      firstname,
      lastname,
      country,
      tier
    } = user;
    console.log("in query", email, password);
    return knex("users")
      .insert({
        email,
        password,
        admin,
        firstname,
        lastname,
        country,
        tier
      })
      .returning("*");
  }
};
