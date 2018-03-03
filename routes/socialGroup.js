const SocialGroupController = require('../controllers/SocialGroupController');
const express = require('express');

const router = express.Router();

router.route('/')
    .get(SocialGroupController.getSocialGroups)
    .post(SocialGroupController.createSocialGroup);
router.route('/:id')
    .get(SocialGroupController.getSocialGroupById)
    .put(SocialGroupController.updateSocialGroup)
    .delete(SocialGroupController.removeSocialGroup);
module.exports = router;
