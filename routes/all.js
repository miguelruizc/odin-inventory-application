const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Category = require('../models/Category');
const { validateItemDataAsync } = require('../utils');

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

	const errors = await validateItemDataAsync(name, description, price, category, stock);

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

router.put('/update/:id', async (req, res) => {
	// Validate data
	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;
	const category = req.body.category;
	const stock = req.body.stock;

	const errors = await validateItemDataAsync(name, description, price, category, stock);

	// Redirect to form if errors
	if (errors.length > 0) {
		let categories;
		const item = await Item.findById(id);
		Category.find({})
			.then((data) => {
				categories = data;

				res.render('all-update.ejs', {
					title: 'Update item',
					item,
					categories,
					preselected: item.category,
					errors,
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

module.exports = router;
