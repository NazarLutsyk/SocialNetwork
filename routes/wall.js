const WallController = require('../controllers/WallController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(WallController.getWalls)
    .post(WallController.createWall);
router.route('/:id')
    .get(WallController.getWallById)
    .delete(WallController.removeWall);
module.exports = router;
