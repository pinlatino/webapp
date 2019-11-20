const express = require("express");
const passport = require("passport");
const user = require("../db/user");
const bcrypt = require("bcrypt");

const router = express.Router();

const createUser = req => {
  const salt = bcrypt.genSaltSync();
  const { firstname, lastname, email, password, country } = req.body;
  const hash = bcrypt.hashSync(password, salt);
  return user.insertUser({
    email,
    password: hash,
    firstname,
    lastname,
    country,
    tier: 1
  });
};

router.post("/api/signup", (req, res) => {
  createUser(req).then(response => {
    return res.send(response);
  });
});

router.post("/api/login", passport.authenticate("local-login"), (req, res) => {
  const {
    passport: { user }
  } = req.session;
  res.send(user);
});

router.get("/api/getuser", (req, res) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    console.log("get user", req.session.passport.user);
    res.send(req.session.passport.user);
  } else {
    res.status(401).send("not authorized");
  }
});

router.post("/api/sign-up", passport.authenticate("local"));

/* router.get(
  "/api/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => res.redirect("/")
);

router.get("/api/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, err => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

router.get("/api/logout", (req, res) => {
  req.logout();

  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL } = process.env;
  res.redirect(
    `https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`
  );
}); */

module.exports = router;
