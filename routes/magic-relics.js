const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
	const items = await Item.find({ category: 'Magic relics' });

	if (items) res.render('magic-relics', { title: 'Magic relics', items });
	else console.log('Error, no equipment items');
});

router.get('/add', (req, res) => {
	res.render('magic-relics-add', { title: 'Add magic relic' });
});

module.exports = router;
