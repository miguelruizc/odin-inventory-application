const mongoose = require('mongoose');
const fs = require('node:fs');
const Item = require('../models/Item');

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then((result) => {
		console.log('Connected to DB');
	})
	.catch((error) => console.log(error));
