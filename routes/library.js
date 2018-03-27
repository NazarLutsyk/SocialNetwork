const LibraryController = require('../controllers/LibraryController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(LibraryController.getLibrarys)
    .post(LibraryController.createLibrary);
router.route('/:id')
    .get(LibraryController.getLibraryById)
    .delete(LibraryController.removeLibrary);
module.exports = router;
