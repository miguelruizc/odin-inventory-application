const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Category = require('../models/Category');
const { validateItemDataAsync } = require('../utils');

router.get('/', async (req, res) => {
	const items = await Item.find({ category: 'Magic relics' });

	if (items) res.render('magic-relics', { title: 'Magic relics', items });
	else console.log('Error, no equipment items');
});

router.get('/add', async (req, res) => {
	const categories = await Category.find({});

	res.render('magic-relics-add', {
		title: 'Add magic relic',
		categories,
		preselected: 'Magic relics',
		errors: null,
		formPath: '/magic-relics/add',
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

				res.render('magic-relics-add', {
					title: 'Add magic relic',
					categories,
					preselected: 'Magic relics',
					errors,
					formPath: '/magic-relics/add',
				});
			})
			.catch((error) => console.log(error));
	}
	// Add data if no errors
	else {
		const newItem = new Item({
			name,
			description,
			price,
			category,
			stock,
		});
		newItem
			.save()
			.then((savedDoc) => {
				console.log('Document saved successfully:');
				console.log(savedDoc);
			})
			.catch((err) => console.log(err));

		res.redirect('/magic-relics');
	}
});

module.exports = router;
