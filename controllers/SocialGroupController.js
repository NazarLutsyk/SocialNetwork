let SocialGroup = require('../models/SocialGroup');
let keysValidator = require('../validators/keysValidator');

module.exports = {
    async getSocialGroups(req, res) {
        try {
            let socialGroupQuery = SocialGroup
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    socialGroupQuery.populate(populateField);
                }
            }
            let socialGroups = await socialGroupQuery.exec();
            res.json(socialGroups);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getSocialGroupById(req, res) {
        let socialGroupId = req.params.id;
        try {
            let socialGroupQuery = SocialGroup.findOne({_id: socialGroupId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    socialGroupQuery.populate(populateField);
                }
            }
            let socialGroup = await socialGroupQuery.exec();
            res.json(socialGroup);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createSocialGroup(req, res) {
        try {
            let socialGroup = new SocialGroup(req.body);
            socialGroup = await socialGroup.supersave();
            res.status(201).json(socialGroup);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateSocialGroup(req, res) {
        let socialGroupId = req.params.id;
        try {
            let err = keysValidator.diff(SocialGroup.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let socialGroup = await SocialGroup.findById(socialGroupId);
                if (socialGroup && req.body) {
                    let updated = await SocialGroup.superupdate(req.body);
                    res.status(201).json(updated);
                }else {
                    res.sendStatus(404);
                }
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeSocialGroup(req, res) {
        let socialGroupId = req.params.id;
        try {
            let socialGroup = await SocialGroup.findById(socialGroupId);
            socialGroup = await socialGroup.remove();
            res.status(204).json(socialGroup);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};