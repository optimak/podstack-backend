// import seed data files, arrays of objects
const podstackData = require('../seed-data/podstack');
const newData = podstackData.map((data)=>
{const { title,  ...details } = data;
return details}
)

exports.seed = async function(knex) {
  await knex('podstack').del();
  await knex('podstack').insert(newData);

};