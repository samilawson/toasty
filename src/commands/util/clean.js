const { Command } = require('discord.js-commando');

module.exports = class CleanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clean',
      group: 'util',
      memberName: 'clean',
      description: 'Cleans all recent commands/messages sent by the bot.',
      throttling: {
        usages: 1,
        duration: 10
      }
    });
  }

  async run(msg) {
    const m = await msg.say('*Cleaning my commands*...');
    const msgs = await msg.channel.fetchMessages({limit: 90});
    let msg_array = msgs.array().filter(m => m.author.id === this.client.user.id);
    msg.channel.bulkDelete(msg_array);
    m.edit(':white_check_mark: Successfully cleaned up my commands!');
  }
};
