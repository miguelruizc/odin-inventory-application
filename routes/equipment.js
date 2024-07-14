const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('equipment', { title: 'Equipment' });
});

module.exports = router;
