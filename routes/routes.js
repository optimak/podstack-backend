const knex = require('knex')(require('../knexfile'));
const router = require('express').Router();

router.get('/', async (_req, res) => {
    try {
        const updatedData = await knex('podstack')
            .where('country', 'Unknown')
            .update({ country: 'Global' });
        const data = await knex('podstack');
        console.log(typeof data)
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Podcaster: ${err}`)
    }
});
router.get('/:id', async (req, res) => {
    try {
        const updatedData = await knex('podstack')
        .where('country', 'Unknown')
        .update({ country: 'Global' });
        const foundPodcaster = await knex('podstack')
            .where({ id: req.params.id });
        res.status(200).json(foundPodcaster);
    } catch (err) {
        res.status(400).send(`Error retrieving Podcaster: ${err}`)
    }
});
module.exports = router;