const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('all', { title: 'All items' });
});

router.get('/add', (req, res) => {
	res.render('all-add', { title: 'Add item' });
});

module.exports = router;
