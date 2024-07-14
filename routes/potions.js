const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
	const items = await Item.find({ category: 'Potions' });

	if (items) res.render('potions', { title: 'Potions', items });
	else console.log('Error, no equipment items');
});

router.get('/add', (req, res) => {
	res.render('potions-add', { title: 'Add potion' });
});

module.exports = router;
