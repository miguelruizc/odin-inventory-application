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

router.get('/update/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (category)
		res.render('categories-update.ejs', {
			title: 'Update category',
			category,
			errors: null,
		});
	else console.log('Error: no category match id');
});

router.put('/update/:id', async (req, res) => {
	// Validate data
	const name = req.body.name.trim();
	const description = req.body.description.trim();

	let errors = [];
	if (!name) errors.push('Name field is required');
	else if (name.length < 3) errors.push('Name must be at least 3 characters long');

	if (!description) errors.push('Description field is required');
	else if (description.length < 10)
		errors.push('Description must be at least 10 characters long');

	// Redirect if errors or handle data
	if (errors.length > 0) {
		const category = await Category.findById(req.params.id);
		res.render('categories-update.ejs', {
			title: 'Update category',
			category,
			errors,
		});
	} else {
		console.log('TODO: update data to DB here');
		console.log('Data: ', req.body);
		res.redirect('/categories');
	}
});

router.get('/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) res.render('categories-detail.ejs', { title: 'Details', category });
	else console.log('Error: no category match id');
});

router.post('/add', (req, res) => {
	// Validate data
	const name = req.body.name.trim();
	const description = req.body.description.trim();

	let errors = [];
	if (!name) errors.push('Name field is required');
	else if (name.length < 3) errors.push('Name must be at least 3 characters long');

	if (!description) errors.push('Description field is required');
	else if (description.length < 10)
		errors.push('Description must be at least 10 characters long');

	// Redirect if errors or handle data
	if (errors.length > 0) {
		res.render('categories-add', { title: 'Add category', errors });
	} else {
		console.log('TODO: Add data to DB here');
		console.log('Data: ', req.body);
		res.redirect('/categories');
	}
});

module.exports = router;
