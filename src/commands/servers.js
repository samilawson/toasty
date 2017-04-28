exports.run = (client, msg) => {
    client.shard.fetchClientValues('guilds.size').then(results => {
          let total = results.reduce((prev, val) => prev + val, 0);
          msg.channel.sendMessage(`My total server count is **${total}** servers!\nThis shard *(shard ${client.shard.id})* has **${client.guilds.size}** servers!`);
        });
}
