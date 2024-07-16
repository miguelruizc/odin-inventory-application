const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');

router.get('/', async (req, res) => {
	const categories = await Category.find({}).sort({ updatedAt: -1 });

	if (categories) res.render('categories', { title: 'Categories', categories });
	else console.log('Error, no categories');
});

router.get('/add', (req, res) => {
	res.render('categories-add', { title: 'Add category', errors: null });
});

router.get('/delete/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);

	// Find dependencies
	const dependencies = await Item.find({ category: category.name });

	if (category)
		res.render('categories-delete.ejs', {
			title: 'Delete category',
			category,
			dependencies,
		});
	else console.log('Error: no category match id');
});

router.delete('/delete/:id', async (req, res) => {
	const id = req.params.id;
	const category = await Category.findById(id);

	// Find dependencies
	const dependencies = await Item.find({ category: category.name });

	// Handle delete if no dependencies
	if (category && dependencies.length === 0) {
		const deletedCategory = await Category.findByIdAndDelete(id);
		console.log('Category deleted succesfully: ');
		console.log(deletedCategory);

		res.redirect('/categories');
	}
});

router.get('/:id', async (req, res) => {
	const category = await Category.findById(req.params.id);
	if (category) res.render('categories-detail.ejs', { title: 'Details', category });
	else console.log('Error: no category match id');
});

router.post('/add', async (req, res) => {
	// Validate data
	const name = req.body.name.trim();
	const description = req.body.description.trim();

	let errors = [];
	if (!name) errors.push('Name field is required');
	else if (name.length < 3) errors.push('Name must be at least 3 characters long');
	else if (await Category.exists({ name: name }))
		errors.push('Category with this name already exists');

	if (!description) errors.push('Description field is required');
	else if (description.length < 10)
		errors.push('Description must be at least 10 characters long');

	// Redirect if errors or handle data
	if (errors.length > 0) {
		res.render('categories-add', { title: 'Add category', errors });
	} else {
		const newCategory = new Category({
			name,
			description,
		});
		await newCategory
			.save()
			.then((savedDoc) => {
				console.log('Document saved successfully:');
				console.log(savedDoc);
			})
			.catch((err) => console.log(err));

		res.redirect('/categories');
	}
});

module.exports = router;
