const UserController = require('../controllers/UserController');
const permission = require('../middleware/authorization/index');
const UserRule = require('../middleware/authorization/rules/User');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(UserController.getUsers);
router.route('/:id')
    .get(UserController.getUserById)
    .put(
        permission.rule(UserRule.updateUser,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        UserController.updateUser
    )
    .delete(
        permission.rule(UserRule.updateUser,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        UserController.removeUser
    );
module.exports = router;

