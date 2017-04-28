const knockknock = require('knock-knock-jokes');
exports.run = (client, msg) => {
    msg.channel.sendMessage(knockknock());
}
