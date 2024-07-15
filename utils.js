const Category = require('./models/Category');

const hiddenMethodsHandler = (req, res, next) => {
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}

	next();
};

const validateItemDataAsync = async (name, description, price, category, stock) => {
	let errors = [];

	if (!name) errors.push('Name field is required');
	else if (name.length < 3) errors.push('Name must be at least 3 characters long');

	if (!description) errors.push('Description field is required');
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

	return errors;
};

module.exports = { hiddenMethodsHandler, validateItemDataAsync };
