const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('magic-relics', { title: 'Magic Relics' });
});

module.exports = router;
