module.exports = function (pathToDir, allwedExtensions) {
    let path = require("path");
    let multer = require("multer");
    let mkdirp = require("mkdirp");

    let diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (!pathToDir)
                pathToDir = path.join(__dirname, "../public", "upload");
            mkdirp(pathToDir, function (err) {
                if (err) return cb(e);
                else return cb(null, pathToDir);
            });
        },
        filename: function (req, file, cb) {
            let originalname = file.originalname;
            let separator = originalname.lastIndexOf(".");
            
            let extension = originalname.substring(separator).toLowerCase();
            let id = Math.floor(Math.random() * (1000000 - 1) + 1);

            let resultFilename = id + "-" + Date.now() + extension;
            if (allwedExtensions && allwedExtensions.indexOf(extension) != -1) {
                return cb(null, resultFilename);
            } else {
                return cb(new Error("Bad extension"));
            }
        }
    });
    return multer({storage: diskStorage});
};