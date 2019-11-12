const express = require("express");
const passport = require("passport");
const user = require("../db/user");
const bcrypt = require("bcrypt");

const router = express.Router();

const createUser = req => {
  const salt = bcrypt.genSaltSync();
  const { username, password } = req.body;
  console.log("username, password", username, password);
  const hash = bcrypt.hashSync(password, salt);
  return user.insertUser({ username, password: hash });
};

router.post("/api/signup", (req, res) => {
  console.log("api signup", req.body);
  createUser(req).then(response => {
    return res.send(response);
  });
});

router.post("/api/login", passport.authenticate("local-login"), (req, res) => {
  console.log("login", req.body);
  console.log("login res session", req.session);
  const {
    passport: { user }
  } = req.session;
  res.send(user);
});

router.get("/api/getuser", (req, res) => {
  const response = user.getFirst();
  console.log("response", response);
  response.then(data => {
    res.send(data);
  });
});

router.post("/api/sign-up", passport.authenticate("local"));

router.get(
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
});

module.exports = router;
