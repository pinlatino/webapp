const knex = require("./connection");

module.exports = {
  getBusinesses: function(id) {
    return knex("businesses");
  },
  insertBusiness: function(businness) {
    const {
      userid,
      name,
      profession,
      description,
      email,
      comment,
      phone,
      website,
      facebook_url,
      instagram_url,
      linkedin_url,
      social_url
    } = businness;
    return knex("businesses")
      .insert({
        userid,
        name,
        profession,
        description,
        email,
        comment,
        phone,
        website,
        facebook_url,
        instagram_url,
        linkedin_url,
        social_url
      })
      .returning("*");
  }
};
