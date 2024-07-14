const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/all');
});

router.get('/all', (req, res) => {
	res.render('all', { title: 'All items' });
});

module.exports = router;
