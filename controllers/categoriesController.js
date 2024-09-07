const Category = require('../models/Category');
const Item = require('../models/Item');

const GET_categories = async (req, res) => {
	const categories = await Category.find({}).sort({ updatedAt: -1 });

	if (categories) res.render('categories', { title: 'Categories', categories });
	else console.log('Error, no categories');
};

const GET_add = (req, res) => {
	res.render('categories-add', { title: 'Add category', errors: null });
};

const GET_delete_id = async (req, res) => {
	// Check if the ID is a valid ObjectId
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.redirect('/404');
	}

	const category = await Category.findById(id);

	// Find dependencies
	const dependencies = await Item.find({ category: category.name });

	if (category)
		res.render('categories-delete.ejs', {
			title: 'Delete category',
			category,
			dependencies,
		});
	else console.log('Error: no category match id');
};

const DELETE_delete_id = async (req, res) => {
	// Check if the ID is a valid ObjectId
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.redirect('/404');
	}

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
};

const GET_id = async (req, res) => {
	// Check if the ID is a valid ObjectId
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.redirect('/404');
	}

	const category = await Category.findById(req.id);
	if (category) res.render('categories-detail.ejs', { title: 'Details', category });
	else console.log('Error: no category match id');
};

const POST_add = async (req, res) => {
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
};

module.exports = {
	GET_categories,
	GET_add,
	GET_delete_id,
	DELETE_delete_id,
	GET_id,
	POST_add,
};
