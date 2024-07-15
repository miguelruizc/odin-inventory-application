const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
	const items = await Item.find({});

	if (items) res.render('all', { title: 'All items', items });
	else console.log('Error, no items');
});

router.get('/add', async (req, res) => {
	const categories = await Category.find({});

	res.render('all-add', {
		title: 'Add item',
		categories,
		preselected: null,
		errors: null,
		formPath: '/all/add',
	});
});

router.get('/:id', async (req, res) => {
	const item = await Item.findById(req.params.id);
	if (item) res.render('all-detail.ejs', { title: 'Details', item });
	else console.log('Error: no item match id');
});

router.post('/add', async (req, res) => {
	// Validate data
	const name = req.body.name;
	const description = req.body.description;
	const price = parseInt(req.body.price);
	const category = req.body.category;
	const stock = parseInt(req.body.stock);

	let errors = [];
	if (!name || name.trim() === '') errors.push('Name field is required');
	else if (name.length < 3) errors.push('Name must be at least 3 characters long');

	if (!description || description.trim() === '') errors.push('Description field is required');
	else if (description.length < 10)
		errors.push('Description must be at least 10 characters long');

	if (!price) errors.push('Price field is required');
	else if (price < 0 || price > 99999)
		errors.push('Price must be bigger than 0 and smaller than 100000');

	if (!category) errors.push('Category field is required');
	else {
		const categoryExists = await Category.exists({ name: category });
		if (!categoryExists) errors.push('Invalid category, chose a category from the menu');
	}

	if (!stock) errors.push('Stock field is required');
	else if (stock < 0 || stock > 99999)
		errors.push('Stock must be bigger than 0 and smaller than 100000');

	// Redirect to form if errors
	if (errors.length > 0) {
		let categories;
		Category.find({})
			.then((data) => {
				categories = data;

				res.render('all-add', {
					title: 'Add item',
					categories,
					preselected: null,
					errors,
					formPath: '/all/add',
				});
			})
			.catch((error) => console.log(error));
	}
	// Add data if no errors
	else {
		console.log('TODO: Add data to DB here');
		console.log('Data: ', req.body);
		res.redirect('/all');
	}
});

router.get('/update/:id', async (req, res) => {
	const item = await Item.findById(req.params.id);
	const categories = await Category.find({});

	if (item)
		res.render('all-update.ejs', {
			title: 'Update item',
			item,
			categories,
			preselected: item.category,
			errors: null,
		});
	else console.log('Error: no item match id');
});

router.put('/update/:id', (req, res) => {
	// Validate data
	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;
	const category = req.body.category;
	const stock = req.body.stock;
});

module.exports = router;
