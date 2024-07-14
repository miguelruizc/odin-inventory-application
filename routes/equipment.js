const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
	const items = await Item.find({ category: 'Equipment' });

	if (items) res.render('equipment', { title: 'Equipment', items });
	else console.log('Error, no equipment items');
});

router.get('/add', (req, res) => {
	res.render('equipment-add', { title: 'Add equipment' });
});

module.exports = router;
