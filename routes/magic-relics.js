const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('magic-relics', { title: 'Magic Relics' });
});

router.get('/add', (req, res) => {
	res.render('magic-relics-add', { title: 'Add magic relic' });
});

module.exports = router;
