const { Command } = require('discord.js-commando');

module.exports = class NPCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'np',
      group: 'music',
      memberName: 'np',
      aliases: ['nowplaying', 'playing'],
      description: 'Says the title, requester and URL of the song that is currently playing.',
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run(msg){}
};
