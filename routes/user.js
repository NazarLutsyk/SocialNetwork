const UserController = require('../controllers/UserController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser);
router.route('/:id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.removeUser);
module.exports = router;

