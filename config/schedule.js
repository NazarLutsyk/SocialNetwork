let Chat = require('../models/Chat');
setInterval(async function () {
    try {
        await Chat.remove({
            members: {$size: 0}
        });
    }
    catch (e) {
        log(e);
    }
}, 1000 * 60 * 60 * 12);