const mongoose = require('mongoose');
const fs = require('node:fs/promises');
const path = require('node:path');
const Category = require('../models/Category');
const Item = require('../models/Item');

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then(async (result) => {
		console.log('Connected to DB');

		// Delete any previous data
		await Item.deleteMany({})
			.then(console.log('All Items deleted'))
			.catch((err) => console.log(err));
		await Category.deleteMany({})
			.then(console.log('All Categories deleted'))
			.catch((err) => console.log(err));

		// Read and add categories
		const categoriesPath = path.join(__dirname, 'categories.json');
		fs.readFile(categoriesPath)
			.then((data) => {
				const categories = JSON.parse(data);
				categories.forEach((category) => {
					const newCategory = new Category({
						name: category.name,
						description: category.description,
					});
					newCategory
						.save()
						.then((saved) => console.log(`Saved category: ${saved.name}`))
						.catch((error) => console.log('Error saving category: ' + error));
				});
			})
			.catch((error) => console.log(error));

		// Read and add items
		const itemsPath = path.join(__dirname, 'items.json');
		fs.readFile(itemsPath)
			.then((data) => {
				const items = JSON.parse(data);
				items.forEach((item) => {
					const newItem = new Item({
						name: item.name,
						description: item.description,
						price: parseInt(item.price),
						category: item.category,
						stock: item.stock,
					});
					newItem
						.save()
						.then((saved) => console.log(`Saved item: ${saved.name}`))
						.catch((error) => console.log('Error saving item: ' + error));
				});
			})
			.catch((error) => console.log(error));
	})
	.catch((error) => console.log(error));
