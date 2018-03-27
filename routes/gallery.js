const GalleryController = require('../controllers/GalleryController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(GalleryController.getGallerys)
    .post(GalleryController.createGallery);
router.route('/:id')
    .get(GalleryController.getGalleryById)
    .delete(GalleryController.removeGallery);
module.exports = router;
