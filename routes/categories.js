const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
	const categories = await Category.find({});

	if (categories) res.render('categories', { title: 'Categories', categories });
	else console.log('Error, no categories');
});

router.get('/add', (req, res) => {
	res.render('categories-add', { title: 'Add category', errors: null });
});

router.get('/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) res.render('categories-detail.ejs', { title: 'Details', category });
	else console.log('Error: no category match id');
});

router.post('/add', (req, res) => {
	// Validate data
	const category = req.body.category;

	let errors = [];
	if (!category || category.trim() === '') errors.push('Category field is required');
	else if (category.length < 3) errors.push('Category must be at least 3 characters long');

	if (errors.length > 0) {
		res.render('categories-add', { title: 'Add category', errors });
	} else {
		console.log('TODO: Add data to DB here');
		console.log('Data: ', req.body);
		res.redirect('/categories');
	}
});

module.exports = router;
