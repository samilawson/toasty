const { Command } = require('discord.js-commando');

module.exports = class TableFlipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tableflip',
      group: 'fun',
      aliases: ['tf', 'flip'],
      memberName: 'tableflip',
      description: 'Flips a table in the chat.',
      throttling: {
        usages: 2,
        duration: 3
      }
    });
  }

  async run(msg) {
    const m = await msg.say('┬─┬ノ( º _ ºノ)');
    setTimeout(() => { m.edit('(╯°□°）╯︵ ┻━┻'); }, 550);
  }
}
