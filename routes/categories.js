const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
	const categories = await Category.find({});

	if (categories) res.render('categories', { title: 'Categories', categories });
	else console.log('Error, no categories');
});

router.get('/add', (req, res) => {
	res.render('categories-add', { title: 'Add category' });
});

router.get('/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) res.render('categories-detail.ejs', { title: 'Details', category });
	else console.log('Error: no category match id');
});

module.exports = router;
