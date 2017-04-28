exports.run = (client, msg) => {
    msg.channel.sendMessage(`:game_die: **${msg.author.username}**, you rolled a **${Math.floor(Math.random() * 6) + 1}**!`);
}
