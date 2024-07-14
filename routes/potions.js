const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('potions', { title: 'Potions' });
});

router.get('/add', (req, res) => {
	res.render('potions-add', { title: 'Add potion' });
});

module.exports = router;
