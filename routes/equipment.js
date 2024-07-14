const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('equipment', { title: 'Equipment' });
});

router.get('/add', (req, res) => {
	res.render('equipment-add', { title: 'Add equipment' });
});

module.exports = router;
