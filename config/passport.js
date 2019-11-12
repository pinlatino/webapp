const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport, knex) => {
  passport.use(
    "local-login",
    new LocalStrategy((username, password, cb) => {
      knex
        .table("users")
        .first("id", "username", "password")
        .where("username", username)
        .then(row => {
          if (row) {
            bcrypt.compare(password, row.password, function(err, res) {
              if (res) {
                cb(null, {
                  id: row.id,
                  username: row.username
                });
              } else {
                cb(null, false);
              }
            });
          }
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(({ id }, cb) => {
    knex
      .table("users")
      .first("username", "id")
      .where("id", parseInt(id, 10))
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        return cb(err);
      });
  });
};
