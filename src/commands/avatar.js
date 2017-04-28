exports.run = (client, msg, args) => {
    let avatar = msg.mentions.users.size ? msg.mentions.users.first().avatarURL : msg.author.avatarURL;
    if (msg.mentions.users.size > 0) {
        msg.channel.sendMessage(`Avatar for, **${msg.mentions.users.first().username}:**\n${avatar}`);
    } else {
      msg.channel.sendMessage(`Avatar for, **${msg.author.username}:**\n${avatar}`);
    }
}
