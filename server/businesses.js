const bodyParser = require("body-parser");
const express = require("express");
const business = require("../db/business");

const router = express.Router();

router.use(bodyParser.json());

function ensureAuthenticated(req, res, next) {
  console.log("req.isAuthenticated()", req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.send(401);
}

router.get("/api/businesses", (req, res) => {
  business.getBusinesses().then(businesses => {
    res.send(businesses);
  });
});

router.post("/api/businesses", ensureAuthenticated, (req, res) => {
  const {
    passport: { user }
  } = req.session;
  console.log("user", user);
  const businessData = {
    ...req.body,
    ...{
      userid: user.id,
      facebook_url: req.body.facebook,
      instagram_url: req.body.instagram,
      linkedin_url: req.body.linkedin,
      social_url: req.body.otherSocial
    }
  };
  business.insertBusiness(businessData).then(response => {
    res.send(response);
  });
});

module.exports = router;
