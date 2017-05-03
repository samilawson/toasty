const roasts = require('../data/roasts.json');
exports.run = (client, msg, args) => {
    args = args.join(" ");
    if (msg.mentions.users.size === 0) return msg.reply(":no_entry_sign: Please mention a user to roast.");
    let user = msg.guild.member(msg.mentions.users.first());
    if (!user) return msg.reply(":no_entry_sign: That user is not valid.");
    if (msg.mentions.users.first().id === "208946659361554432") return msg.reply("I'm not gonna roast myself dumbass!");
    msg.channel.sendMessage(`:fire: **${msg.mentions.users.first().username}**, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
}
