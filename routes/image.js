const ImageController = require('../controllers/ImageController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(ImageController.getImages)
    .post(ImageController.createImage);
router.route('/:id')
    .get(ImageController.getImageById)
    .put(ImageController.updateImage)
    .delete(ImageController.removeImage);

module.exports = router;
