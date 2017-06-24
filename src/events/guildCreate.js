const config = require('../config.json');
const snekfetch = require('snekfetch');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

exports.run = async (client, guild) => {
  guild.defaultChannel.send(':wave: Hey there, I\'m Toasty!\nA fun, moderating and delicious multi-purpose Discord bot for all your needs!\nType, `;help` for a list of commands!\n*Info:* Some of the moderation commands such as the joinrole, modlog, joinlog, etc, require the **Bot Commander** role to be used.\nIf you have any questions, please join https://discord.me/toasty, or type, `;hq`.\nThanks for inviting me!');

  const guildRes = await client.shard.fetchClientValues('guilds.size');
  const guilds = guildRes.reduce((prev, val) => prev + val, 0);
  client.user.setGame(`;help | ${guilds.toLocaleString()} servers!`);

  /*const content = clean(`:white_check_mark: I've been invited to server **${guild.name}**\nServer ID: **${guild.id}**\nMembers: **${guild.memberCount}**\nRegion: **${guild.region}**`);
  const id = '303203639101620224';
  snekfetch.post(`https://discordapp.com/api/channels/${id}/messages`)
    .set('Authorization', `Bot ${client.token}`)
    .send({ content })
    .then(console.log('Added to server and sent to log.'));*/

  snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set('Authorization', config.discordbotsToken)
    .send({
      server_count: client.guilds.size,
      shard_id: client.shard.id,
      shard_count: client.shard.count
    })
    .then(console.log('Sent guild count to discordbots.org!'));

  snekfetch.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
    .set('Authorization', config.discordpwToken)
    .send({
      server_count: client.guilds.size,
      shard_id: client.shard.id,
      shard_count: client.shard.count
    })
    .then(console.log('Sent guild count to bots.discord.pw!'));

}
