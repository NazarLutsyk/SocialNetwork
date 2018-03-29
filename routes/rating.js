const RatingController = require('../controllers/RatingController');
const permission = require('../middleware/authorization/index');
const RatingRule = require('../middleware/authorization/rules/Rating');
const Roles = require('../config/roles');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(RatingController.getRatings)
    .post(RatingController.createRating);
router.route('/:id')
    .get(RatingController.getRatingById)
    .put(
        permission.rule(RatingController.updateRating,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        RatingController.updateRating
    )
    .delete(
        permission.rule(RatingController.updateRating,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        RatingController.removeRating
    );
module.exports = router;
