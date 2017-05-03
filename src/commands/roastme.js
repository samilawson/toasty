const roasts = require('../data/roasts.json');
exports.run = (client, msg) => {
    msg.channel.sendMessage(`:fire: **${msg.author.username}**, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
}
