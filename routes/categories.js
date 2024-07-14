const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('categories', { title: 'Categories' });
});

router.get('/add', (req, res) => {
	res.render('categories-add', { title: 'Add category' });
});

module.exports = router;
