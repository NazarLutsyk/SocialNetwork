let User = require('../../../models/User');
let Image = require('../../../models/Image');
let objectHelper = require('../../../helpers/objectHelper');
module.exports = {
    async updateImage(req, res, next) {
        try {
            let user = req.user;
            let imageId = req.params.id;
            let image = await Image.findById(imageId);
            let gallery = await User.count({_id: image.author, _id: user._id});
            if(req.body){
                let contains = objectHelper.someKeyContains(req.body, Image.notUpdatable());
                if(contains){
                    return res.sendStatus(403);
                }
            }
            if (gallery > 0) {
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (e) {
            return res.status(400).send(e.toString());
        }
    }
};