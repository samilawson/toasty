exports.run = (client, msg) => {
    msg.channel.sendMessage(`You are on shard **${client.shard.id}/${client.shard.count}**!\nThe total amount of shards is **${client.shard.count}**.`);
}
