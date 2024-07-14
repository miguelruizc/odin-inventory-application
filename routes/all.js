const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
	const items = await Item.find({});

	if (items) res.render('all', { title: 'All items', items });
	else console.log('Error, no items');
});

router.get('/add', (req, res) => {
	res.render('all-add', { title: 'Add item' });
});

module.exports = router;
