const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ServersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'servers',
      group: 'util',
      aliases: ['guilds'],
      memberName: 'servers',
      description: 'Sends how many servers the bot is on.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  async run(msg) {
    const m = await msg.say('*Fetching servers...*');
    const embed = new RichEmbed();
    const guildRes = await this.client.shard.fetchClientValues('guilds.size');
    const guilds = guildRes.reduce((prev, val) => prev + val, 0);
    embed.setTitle('Server Information')
         .addField('Total servers:', guilds.toLocaleString())
         .addField('Total shards:', this.client.shard.count)
         .addField('Shard 0 servers:', guildRes[0].toLocaleString())
         .addField('Shard 1 servers:', guildRes[1].toLocaleString())
         //.addField('Shard 2 servers:', guildRes[2].toLocaleString());
     m.edit({ embed });
  }
};
