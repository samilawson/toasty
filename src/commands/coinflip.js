let options = ["heads", "tails"];
exports.run = (client, msg) => {
    msg.channel.sendMessage(`**${msg.author.username}**, you got **${options[Math.floor(Math.random() * options.length)]}**!`);
}
