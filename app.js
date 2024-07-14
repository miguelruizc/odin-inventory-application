const express = require('express');
const path = require('node:path');
const mongoose = require('mongoose');
const allRouter = require('./routes/all.js');
const categoriesRouter = require('./routes/categories.js');
const equipmentRouter = require('./routes/equipment.js');
const magicRelicsRouter = require('./routes/magic-relics.js');
const potionsRouter = require('./routes/potions.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', allRouter);
app.use('/all', allRouter);
app.use('/categories', categoriesRouter);
app.use('/equipment', equipmentRouter);
app.use('/magic-relics', magicRelicsRouter);
app.use('/potions', potionsRouter);

// TODO: 404

mongoose
	.connect(process.env.MONGODB_URI, {})
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(3000, () => {
			console.log('Server running, listening port 3000...');
		});
	})
	.catch((error) => console.error(error));
