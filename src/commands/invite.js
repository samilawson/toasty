const config = require('../config.json');
exports.run = (client, msg) => {
    msg.reply(`You can invite me to your server with this!\n${config.oauth}`);
}
