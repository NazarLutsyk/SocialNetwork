const ImageController = require('../controllers/ImageController');
const permission = require('../middleware/authorization/index');
const ImageRule = require('../middleware/authorization/rules/Image');
const GlobalRule = require('../middleware/authorization/rules/Global');
const Roles = require('../config/roles');
const Image = require('../models/Image');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(ImageController.getImages)
    .post(
        permission.rule(GlobalRule.updatable(Image.notUpdatable)),
        ImageController.createImage
    );
router.route('/:id')
    .get(ImageController.getImageById)
    .delete(
        permission.rule(ImageRule.updateImage,Roles.GLOBAL_ROLES.SUPER_ADMIN),
        ImageController.removeImage
    );

module.exports = router;
