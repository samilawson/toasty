exports.run = (client, msg) => {
    msg.channel.sendMessage(`**${msg.author.username}**, you are on shard **${client.shard.id}/${client.shard.count - 1}**.`);
}
