const { Command } = require('discord.js-commando');

module.exports = class LennyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lenny',
      group: 'fun',
      memberName: 'lenny',
      description: 'Sends the lenny face.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  run(msg) {
    msg.say('( ͡° ͜ʖ ͡°)');
  }
}
