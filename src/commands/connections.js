exports.run = (client, msg) => {
  client.shard.fetchClientValues('voiceConnections.size').then(results => {
        let total = results.reduce((prev, val) => prev + val, 0);
        msg.channel.sendMessage(`:notes: Currently playing some *toasty* music in **${total}** voice channels.\nThis shard (shard ${client.shard.id}) is playing in **${client.voiceConnections.size}** voice channels.`);
      });
}
