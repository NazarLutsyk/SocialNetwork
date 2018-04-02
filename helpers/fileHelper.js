let fs = require('fs');

module.exports = {
    deleteFiles(files) {
        if (!Array.isArray(files)) {
            files = [files];
        }
        if (files.length > 0) {
            for (let file of files) {
                fs.exists(file, function (exists) {
                    if (exists) {
                        fs.unlink(file, function (err) {
                            if (err) {
                                throw new Error(err);
                            }
                            return true;
                        });
                    }
                });
            }
        } else {
            return false;
        }
    }
};