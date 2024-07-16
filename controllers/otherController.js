const Item = require('../models/Item');
const Category = require('../models/Category');

const GET_other = async (req, res) => {
	const excluded = ['Potions', 'Magic relics', 'Equipment'];
	const items = await Item.find({ category: { $nin: excluded } }).sort({ updatedAt: -1 });

	if (items) res.render('other', { title: 'Other items', items });
	else console.log('Error, no items in other category');
};

module.exports = { GET_other };
