const Item = require('../models/Item');
const Category = require('../models/Category');
const { validateItemDataAsync } = require('../utils');

const GET_equipment = async (req, res) => {
	const items = await Item.find({ category: 'Equipment' }).sort({ updatedAt: -1 });

	if (items) res.render('equipment', { title: 'Equipment', items });
	else console.log('Error, no equipment items');
};

const GET_add = async (req, res) => {
	const categories = await Category.find({});

	res.render('equipment-add', {
		title: 'Add equipment',
		categories,
		preselected: 'Equipment',
		errors: null,
		formPath: '/equipment/add',
	});
};

const POST_add = async (req, res) => {
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

				res.render('equipment-add', {
					title: 'Add equipment',
					categories,
					preselected: 'Equipment',
					errors,
					formPath: '/equipment/add',
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
		await newItem
			.save()
			.then((savedDoc) => {
				console.log('Document saved successfully:');
				console.log(savedDoc);
			})
			.catch((err) => console.log(err));

		res.redirect('/equipment');
	}
};

module.exports = {
	GET_equipment,
	GET_add,
	POST_add,
};
