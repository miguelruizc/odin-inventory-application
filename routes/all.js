const express = require('express');
const router = express.Router();

const {
	GET_all,
	GET_all_add,
	GET_all_delete_id,
	DELETE_all_delete_id,
	GET_all_id,
	POST_all_add,
	GET_all_update_id,
	PUT_all_update_id,
} = require('../controllers/allController');

router.get('/', GET_all);

router.get('/add', GET_all_add);

router.get('/delete/:id', GET_all_delete_id);

router.delete('/delete/:id', DELETE_all_delete_id);

router.get('/:id', GET_all_id);

router.post('/add', POST_all_add);

router.get('/update/:id', GET_all_update_id);

router.put('/update/:id', PUT_all_update_id);

module.exports = router;
