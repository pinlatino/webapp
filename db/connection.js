const environment = process.env.NODE_ENV || "development";
const config = require("../knexfile")[environment];
console.log("process.env.DATABASE_URL knex", process.env.DATABASE_URL);
module.exports = require("knex")(config);
