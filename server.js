require("dotenv").config();
const express = require("express");
const http = require("http");
const next = require("next");
const session = require("express-session");
const bodyParser = require("body-parser");
// 1 - importing dependencies
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require("uid-safe");
const authRoutes = require("./server/auth-routes");
const businessesAPI = require("./server/businesses");
const connection = require("./db/connection");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const handle = app.getRequestHandler();

console.log("db url", process.env.DATABASE_URL);

app.prepare().then(() => {
  const server = express();

  // 2 - add session management to Express
  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true
  };
  server.use(session(sessionConfig));

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  server.use(bodyParser.json());

  // 3 - configuring Auth0Strategy
  /*   const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  ); */

  // 4 - configuring Passport
  /*   passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user)); */

  // 5 - adding Passport and authentication routes
  server.use(passport.initialize());
  server.use(passport.session());

  // local strategy

  require("./config/passport")(passport, connection);

  server.use(authRoutes);

  server.use(businessesAPI);

  // 6 - you are restricting access to some routes
  /*   const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  }; */

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
