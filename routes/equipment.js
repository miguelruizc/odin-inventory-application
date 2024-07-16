const express = require('express');
const router = express.Router();
const { GET_equipment, GET_add, POST_add } = require('../controllers/equipmentController');

router.get('/', GET_equipment);

router.get('/add', GET_add);

router.post('/add', POST_add);

module.exports = router;
