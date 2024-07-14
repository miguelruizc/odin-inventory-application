const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
	category: { type: String, required: true },
});

ItemSchema.virtual('url').get(function () {
	return `/all/${this._id}`;
});

ItemSchema.virtual('formattedPrice').get(function () {
	return this.price + ' gold';
});

module.exports = mongoose.model('Item', ItemSchema);
