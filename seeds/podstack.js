// import seed data files, arrays of objects
const podstackData = require('../seed-data/podcasters.json');



exports.seed = async function(knex) {
  await knex('podstack').del();
  await knex('podstack').insert(podstackData);

};