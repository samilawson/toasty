const Discord = require('discord.js');
exports.run = (client, msg, args, data, errors, devs) => {
    const shardClientUtil = new Discord.ShardClientUtil(client);
    if (!devs.includes(msg.author.id)) return msg.reply(errors.devErr);
    msg.reply(`Would you like to restart just this shard, (shard ${client.shard.id}), or all shards?\n*This will be canceled in 10 seconds.*`).then(() => {
      msg.channel.awaitMessages(m => m.author.id === msg.author.id && ['this', 'all'].includes(m.content), {time: 10000, maxMatches: 1})
      .then(collected => {
      if (!collected.size) {
      return;
    } else if (collected.first().content.toLowerCase() === 'this') {
      msg.channel.sendMessage(`\`\`\`css\nRestarting shard ${client.shard.id}...\`\`\``);
      console.log(`Restarting shard ${client.shard.id}...`);
      setTimeout(() => { console.log(process.exit(0)); }, 400);
    } else if (collected.first().content.toLowerCase() === 'all') {
      msg.channel.sendMessage("```css\nRestarting...```");
      console.log("Restarting all shards...");
      setTimeout(() => { shardClientUtil.broadcastEval(console.log(process.exit(0))).then(x => {console.log(x)}); }, 400);
    } else {
      msg.reply("You didn't say, `this`, or `all`. Returning...");
    }
});
});
}
