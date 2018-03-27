const UserController = require('../controllers/UserController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(UserController.getUsers);
router.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.removeUser);
module.exports = router;

