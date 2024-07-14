const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(3000, () => {
			console.log('Server running, listening port 3000...');
		});
	})
	.catch((error) => console.error(error));
