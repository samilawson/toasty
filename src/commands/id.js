exports.run = (client, msg, args) => {
    let id = msg.mentions.users.size ? msg.mentions.users.first().id : msg.author.id;
    if (msg.mentions.users.size > 0) {
        msg.channel.sendMessage(`:id: for **${msg.mentions.users.first().username} :** \`${id}\``);
    } else {
        msg.channel.sendMessage(`:id: for **${msg.author.username} :** \`${id}\``);
    }
}
