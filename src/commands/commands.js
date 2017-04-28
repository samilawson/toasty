const help = require('../data/helpMsgs.json');
exports.run = (client, msg) => {
        msg.author.sendMessage(help.helpMsg1);
        setTimeout(() => {
            msg.author.sendMessage(help.helpMsg2);
        }, 250);
        setTimeout(() => {
            msg.author.sendMessage(help.helpMsg3);
        }, 500);
        setTimeout(() => {
            msg.author.sendMessage(help.helpMsg4);
        }, 800);
        msg.reply(`:mailbox_with_mail: **${msg.author.username}**, check your DMs!`);
}
