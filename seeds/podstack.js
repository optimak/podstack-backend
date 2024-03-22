// import seed data files, arrays of objects
// const podstackData = require('../seed-data/podstack');
const podstackData = require('../seed-data/podcasters.json');

// const newData = podstackData.map((data)=>
// {const { title,  ...details } = data;
// return details}
// )
console.log(podstackData)

exports.seed = async function(knex) {
  await knex('podstack').del();
  await knex('podstack').insert(podstackData);

};