const bodyParser = require("body-parser");
const express = require("express");

const router = express.Router();

router.use(bodyParser.json());

const businesses = [
  { _id: 123, message: "I love pepperoni pizza!", author: "unknown" },
  { _id: 456, message: "I'm watching Netflix.", author: "unknown" }
];

function ensureAuthenticated(req, res, next) {
  console.log("req.isAuthenticated()", req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.send(401);
}

router.get("/api/businesses", ensureAuthenticated, (req, res) => {
  const orderedBusinesses = businesses.sort((t1, t2) => t2._id - t1._id);
  res.send(orderedBusinesses);
});

router.post("/api/businesses", ensureAuthenticated, (req, res) => {
  const { message } = req.body;
  const newBusiness = {
    _id: new Date().getTime(),
    message,
    author: "unknown"
  };
  businesses.push(newBusiness);
  res.send({ message: "Thanks!" });
});

module.exports = router;
