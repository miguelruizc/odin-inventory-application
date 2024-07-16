const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Item = require('../models/Item');
const {
	GET_categories,
	GET_add,
	GET_delete_id,
	DELETE_delete_id,
	GET_id,
	POST_add,
} = require('../controllers/categoriesController');

router.get('/', GET_categories);

router.get('/add', GET_categories_add);

router.get('/delete/:id', GET_delete_id);

router.delete('/delete/:id', DELETE_delete_id);

router.get('/:id', GET_id);

router.post('/add', POST_add);

module.exports = router;
