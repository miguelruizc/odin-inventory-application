const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Category = require('../models/Category');
const { validateItemDataAsync } = require('../utils');

router.get('/', async (req, res) => {
	const items = await Item.find({ category: 'Potions' });

	if (items) res.render('potions', { title: 'Potions', items });
	else console.log('Error, no equipment items');
});

router.get('/add', async (req, res) => {
	const categories = await Category.find({});

	res.render('potions-add', {
		title: 'Add potion',
		categories,
		preselected: 'Potions',
		errors: null,
		formPath: '/potions/add',
	});
});

router.post('/add', async (req, res) => {
	// Validate data
	const name = req.body.name.trim();
	const description = req.body.description.trim();
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

				res.render('potions-add', {
					title: 'Add potion',
					categories,
					preselected: 'Potions',
					errors,
					formPath: '/potions/add',
				});
			})
			.catch((error) => console.log(error));
	}
	// Add data if no errors
	else {
		console.log('TODO: Add data to DB here');
		console.log('Data: ', req.body);
		res.redirect('/potions');
	}
});

module.exports = router;
