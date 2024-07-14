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

router.get('/:id', async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item) res.render('all-detail.ejs', { title: 'Details', item });
	else console.log('Error: no item match id');
});

module.exports = router;
