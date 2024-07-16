const express = require('express');
const router = express.Router();
const { GET_magic_relics, GET_add, POST_add } = require('../controllers/magic-relicsController');

router.get('/', GET_magic_relics);

router.get('/add', GET_add);

router.post('/add', POST_add);

module.exports = router;
