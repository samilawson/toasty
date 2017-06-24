const { Command } = require('discord.js-commando');
const path = require('path');
const { donators } = require(path.join(__dirname, '..', '..', 'config.json'));

module.exports = class DonatorsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'donators',
      group: 'misc',
      memberName: 'donators',
      description: 'Lists my donators.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run(msg) {
    msg.say('These are the donators who have supported this project:\n'+donators);
  }
}
