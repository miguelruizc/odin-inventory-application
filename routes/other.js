const express = require('express');
const router = express.Router();
const { GET_other } = require('../controllers/otherController');

router.get('/', GET_other);

module.exports = router;
