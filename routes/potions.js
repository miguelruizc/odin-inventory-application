const express = require('express');
const router = express.Router();
const { GET_potions, GET_add, POST_add } = require('../controllers/potionsController');

router.get('/', GET_potions);

router.get('/add', GET_add);

router.post('/add', POST_add);

module.exports = router;
