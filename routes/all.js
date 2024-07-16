const express = require('express');
const router = express.Router();

const {
	GET_all,
	GET_add,
	GET_delete_id,
	DELETE_delete_id,
	GET_id,
	POST_add,
	GET_update_id,
	PUT_update_id,
} = require('../controllers/allController');

router.get('/', GET_all);

router.get('/add', GET_add);

router.get('/delete/:id', GET_delete_id);

router.delete('/delete/:id', DELETE_delete_id);

router.get('/:id', GET_id);

router.post('/add', POST_add);

router.get('/update/:id', GET_update_id);

router.put('/update/:id', PUT_update_id);

module.exports = router;
